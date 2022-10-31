import { Injectable } from '@angular/core';
import { RubricData } from '@api/wiki-service/models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { WikiTreeNode } from '../models/tree-types';

const DATA: RubricData[] = [
	{
		id: '0',
		name: 'Важное о компании',
		isActive: true,
		children: [
			{
				id: '1',
				parentId: '0',
				name: 'Наши ключевые проекты',
				isActive: true,
				children: [],
				articlesNames: [
					{ id: '11', name: 'Проект 1', isActive: true },
					{
						id: '12',
						name: 'Цифровой двойник сейсморазмедки D-Seis (заказчик - ПАО “Газпром нефть”, Россия)',
						isActive: true,
					},
				],
			},
			{
				id: '1',
				parentId: '0',
				name: 'Наши ключевые проекты',
				isActive: true,
				children: [],
				articlesNames: [
					{ id: '11', name: 'Проект 1', isActive: true },
					{
						id: '12',
						name: 'Цифровой двойник сейсморазмедки D-Seis (заказчик - ПАО “Газпром нефть”, Россия)',
						isActive: true,
					},
				],
			},
			{
				id: '1',
				parentId: '0',
				name: 'Наши ключевые проекты',
				isActive: true,
				children: [],
				articlesNames: [
					{ id: '11', name: 'Проект 1', isActive: true },
					{
						id: '12',
						name: 'Цифровой двойник сейсморазмедки D-Seis (заказчик - ПАО “Газпром нефть”, Россия)',
						isActive: true,
					},
				],
			},
			{
				id: '2',
				parentId: '0',
				name: 'Корпоративная культура',
				isActive: true,
				children: [],
				articlesNames: [
					{ id: '21', name: 'Проект 228', isActive: true },
					{
						id: '22',
						name: 'Hello, world!',
						isActive: false,
					},
				],
			},
		],
		articlesNames: [
			{ id: '31', name: 'Проект 1', isActive: false },
			{
				id: '32',
				name: 'Цифровой двойник сейсморазмедки D-Seis (заказчик - ПАО “Газпром нефть”, Россия)',
				isActive: true,
			},
		],
	},
];

@Injectable({
	providedIn: 'root',
})
export class WikiTreeService {
	constructor() {}

	public getWikiTree(): Observable<WikiTreeNode[]> {
		return of(DATA).pipe(map((data) => this.convertApiDataToClientTree(data)));
	}

	private convertApiDataToClientTree(data: RubricData[]): WikiTreeNode[] {
		return data.map((d) => {
			const articleNodes: WikiTreeNode[] = d.articlesNames.map((a) => ({
				id: a.id,
				parentId: d.id,
				type: 'article',
				name: a.name,
				isActive: a.isActive,
			}));
			return {
				id: d.id,
				parentId: d.parentId,
				type: 'rubric',
				name: d.name,
				isActive: d.isActive,
				children: this.convertApiDataToClientTree(d.children).concat(articleNodes),
			};
		});
	}
}
