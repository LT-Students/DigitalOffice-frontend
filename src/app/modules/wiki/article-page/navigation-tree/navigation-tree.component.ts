import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Icons } from '@shared/modules/icons/icons';
import { TreeDataSource, WikiTreeFlatNode, WikiTreeMap } from '../../models';

@Component({
	selector: 'do-navigation-tree',
	templateUrl: './navigation-tree.component.html',
	styleUrls: ['./navigation-tree.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationTreeComponent implements OnInit {
	public readonly Icons = Icons;
	public readonly TREE_PADDING = 26;

	@Output() activeArticleChange = new EventEmitter<string>();

	@Input() tree!: WikiTreeMap;
	@Input() activeArticleId = '';

	public dataSource!: TreeDataSource<WikiTreeFlatNode>;
	public treeControl!: FlatTreeControl<WikiTreeFlatNode>;

	constructor() {}

	public ngOnInit(): void {
		this.treeControl = new FlatTreeControl<WikiTreeFlatNode>(
			(n) => n.level,
			(n) => !!n.children
		);
		this.dataSource = new TreeDataSource(this.treeControl, [...this.tree.values()]);
		this.dataSource.data = this.findRootSubNodes();

		this.expandTreeToActiveNode(this.activeArticleId);
	}

	public hasChild(_: number, node: WikiTreeFlatNode): boolean {
		return !!node.children;
	}

	private findRootSubNodes(): WikiTreeFlatNode[] {
		try {
			let rootNode: WikiTreeFlatNode | null = null;
			let nodeId = this.activeArticleId;
			while (!rootNode) {
				const node = this.tree.get(nodeId) as WikiTreeFlatNode;
				if (!node.parentId) {
					rootNode = node;
				} else {
					nodeId = node.parentId;
				}
			}
			return this.treeControl.getDescendants(rootNode).map((n) => ({ ...n, level: n.level - 1 }));
		} catch (e) {
			return [];
		}
	}

	private expandTreeToActiveNode(nodeId: string): void {
		const node = this.treeControl.dataNodes.find((n) => n.id === nodeId);
		if (!node) {
			return;
		}
		if (node.level !== 0) {
			const rubric = this.treeControl.dataNodes.find((n) => n.id === node.parentId);
			if (rubric) {
				this.treeControl.expand(rubric);
			}
		}
	}
}
