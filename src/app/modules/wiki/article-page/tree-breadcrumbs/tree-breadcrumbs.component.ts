import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { WikiTreeMap } from '../../models';

@Component({
	selector: 'do-tree-breadcrumbs',
	templateUrl: './tree-breadcrumbs.component.html',
	styleUrls: ['./tree-breadcrumbs.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeBreadcrumbsComponent {
	public readonly Icons = Icons;

	@Input() tree!: WikiTreeMap;

	@Input()
	set activeArticleId(articleId: string) {
		this.breadcrumbs = [];
		let node = this.tree.get(articleId);
		while (node && node.parentId) {
			this.breadcrumbs.push(node.name);
			node = this.tree.get(node.parentId);
		}
		this.breadcrumbs.reverse();
	}
	public breadcrumbs: string[] = [];

	constructor() {}
}
