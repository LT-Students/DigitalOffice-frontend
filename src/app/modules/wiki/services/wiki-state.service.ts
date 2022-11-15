import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { ArticleData, ArticleResponse, RubricData } from '@api/wiki-service/models';
import { ArticlePath, PatchDocument } from '@app/types/edit-request';
import { booleanGuard } from '@app/utils/utils';
import { WikiTreeFlatNode, WikiTreeMap } from '../models';
import { WikiApiService } from './wiki-api.service';

@Injectable({
	providedIn: 'root',
})
export class WikiStateService {
	private wikiTree = new BehaviorSubject<WikiTreeMap | null>(null);

	public get tree$(): Observable<WikiTreeMap> {
		return this.wikiTree.asObservable().pipe(filter(booleanGuard));
	}

	public get rootRubrics$(): Observable<WikiTreeFlatNode[]> {
		return this.tree$.pipe(
			map((tree: WikiTreeMap) => [...tree.values()].filter((n: WikiTreeFlatNode) => !n.parentId))
		);
	}

	private activeArticle = new BehaviorSubject<ArticleResponse | null>(null);
	public get activeArticle$(): Observable<ArticleResponse> {
		return this.activeArticle.asObservable().pipe(filter(booleanGuard));
	}

	constructor(private wikiApi: WikiApiService) {}

	public setActiveArticle(article: ArticleResponse): void {
		this.activeArticle.next(article);
	}

	private refreshArticle(): Observable<ArticleResponse> {
		return this.activeArticle$.pipe(
			first(),
			switchMap(({ id }) => this.wikiApi.getArticle(id)),
			tap(this.setActiveArticle.bind(this))
		);
	}

	public updateArticle({ title, content }: { title: string; content: string }): Observable<any> {
		return this.activeArticle$.pipe(
			first(),
			switchMap((article) => {
				const editRequest = [];
				if (title !== article.name) {
					editRequest.push(new PatchDocument(title, ArticlePath.Name));
					this.updateArticleNode(article.id, title);
				}
				if (content !== article.content) {
					editRequest.push(new PatchDocument(content, ArticlePath.Content));
				}
				if (editRequest.length) {
					return this.wikiApi
						.editArticle(article.id, editRequest)
						.pipe(switchMap(() => this.refreshArticle()));
				}
				return of(true);
			})
		);
	}

	private updateArticleNode(articleId: string, title: string): void {
		this.tree$.pipe(first()).subscribe((tree) => {
			const article = tree.get(articleId) as WikiTreeFlatNode;
			article.name = title;
			this.wikiTree.next(tree);
		});
	}

	public getSubRubricsByParentId$(parentId: string): Observable<WikiTreeFlatNode[]> {
		return this.tree$.pipe(
			map((tree: WikiTreeMap) => {
				const parent = tree.get(parentId);
				return (parent?.children || [])
					.map((childId) => tree.get(childId))
					.filter(booleanGuard)
					.filter((n) => n.isRubric);
			})
		);
	}

	public setWikiTree(apiData: RubricData[]): void {
		const tree = this.convertApiDataToFlatTree(apiData);
		this.wikiTree.next(tree);
	}

	private convertApiDataToFlatTree(data: RubricData[]): WikiTreeMap {
		const map = new WikiTreeMap();
		data.forEach((d: RubricData) => this.flattenTree(d, 0, map));
		return map;
	}

	private flattenTree(node: RubricData, level: number, resultNodes: WikiTreeMap): void {
		const flatNode = this.createFlatNode(node, true, level, node.parentId);
		resultNodes.set(flatNode.id, flatNode);
		node.articles?.forEach((a: ArticleData) => {
			const n = this.createFlatNode(a, false, level + 1, node.id);
			resultNodes.set(n.id, n);
		});
		node.children.forEach((d: RubricData) => this.flattenTree(d, level + 1, resultNodes));
	}

	private createFlatNode(
		node: RubricData | ArticleData,
		isRubric: boolean,
		level: number,
		parentId?: string
	): WikiTreeFlatNode {
		const flatNode: WikiTreeFlatNode = {
			id: node.id,
			parentId,
			name: node.name,
			isRubric,
			isActive: node.isActive,
			level,
		};
		if ('children' in node || 'articles' in node) {
			flatNode.children = [...node.children.map((n) => n.id), ...(node.articles || []).map((a) => a.id)];
		}
		return flatNode;
	}

	public clearState(): void {
		this.wikiTree.next(null);
	}
}
