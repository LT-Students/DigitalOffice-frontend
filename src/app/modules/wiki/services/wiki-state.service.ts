import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ArticleData, RubricData } from '@api/wiki-service/models';
import { booleanGuard } from '@app/utils/utils';
import { WikiTreeFlatNode, WikiTreeMap } from '../models';

export interface WikiState {
	flatTree: WikiTreeMap;
}

@Injectable({
	providedIn: 'root',
})
export class WikiStateService {
	private state = new BehaviorSubject<WikiState | null>(null);

	public get tree$(): Observable<WikiTreeMap> {
		return this.state.asObservable().pipe(
			filter(booleanGuard),
			map((state: WikiState) => state.flatTree)
		);
	}

	public get rootRubrics$(): Observable<WikiTreeFlatNode[]> {
		return this.tree$.pipe(
			map((tree: WikiTreeMap) => [...tree.values()].filter((n: WikiTreeFlatNode) => !n.parentId))
		);
	}

	constructor() {}

	public getSubRubricsByParentId$(parentId: string): Observable<WikiTreeFlatNode[]> {
		return this.tree$.pipe(
			map((tree: WikiTreeMap) =>
				[...tree.values()].filter((n: WikiTreeFlatNode) => n.parentId === parentId && n.isRubric)
			)
		);
	}

	public setWikiTree(apiData: RubricData[]): void {
		const tree = this.convertApiDataToFlatTree(apiData);
		this.state.next({ flatTree: tree });
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
		this.state.next(null);
	}
}
