import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Icons } from '@shared/modules/icons/icons';
import { WikiTreeFlatNode, WikiTreeNode } from '../../models/tree-types';

@Component({
	selector: 'do-navigation-tree',
	templateUrl: './navigation-tree.component.html',
	styleUrls: ['./navigation-tree.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationTreeComponent implements OnInit {
	public readonly Icons = Icons;
	public readonly TREE_PADDING = 26;

	@Input() tree: WikiTreeNode[] = [];
	@Input() activeArticleId = '';
	public dataSource!: MatTreeFlatDataSource<WikiTreeNode, WikiTreeFlatNode>;
	public treeControl!: FlatTreeControl<WikiTreeFlatNode>;

	constructor() {}

	ngOnInit(): void {
		const treeFlattener = new MatTreeFlattener(
			this.transformer,
			this.getLevel,
			this.isExpandable,
			this.getChildren
		);
		this.treeControl = new FlatTreeControl<WikiTreeFlatNode>(this.getLevel, this.isExpandable);
		this.dataSource = new MatTreeFlatDataSource(this.treeControl, treeFlattener, this.tree);

		this.expandTreeToActiveNode(this.activeArticleId);
	}

	private transformer(node: WikiTreeNode, level: number): WikiTreeFlatNode {
		return {
			...node,
			children: node.children?.map((c) => c.id),
			level,
			expandable: !!(node.children && node.children.length),
		};
	}

	private getLevel(node: WikiTreeFlatNode): number {
		return node.level;
	}

	private isExpandable(node: WikiTreeFlatNode): boolean {
		return node.expandable;
	}

	private getChildren(node: WikiTreeNode): WikiTreeNode[] | undefined {
		return node.children;
	}

	public setActiveArticle(node: WikiTreeNode): void {
		if (node.type === 'article') {
			this.activeArticleId = node.id;
		}
	}

	private expandTreeToActiveNode(nodeId: string): void {
		const node = this.treeControl.dataNodes.find((n) => n.id === nodeId);
		if (!node) {
			return;
		}
		if (node.expandable) {
			this.treeControl.expand(node);
		}
		if (node.parentId) {
			this.expandTreeToActiveNode(node.parentId);
		}
	}
}
