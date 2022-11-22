import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { FlatTreeControl } from '@angular/cdk/tree';
import { WikiStateService } from '../../services';
import { TreeDataSource, WikiTreeFlatNode, WikiTreeMap } from '../../models';

@Component({
	selector: 'do-editable-tree',
	templateUrl: './editable-tree.component.html',
	styleUrls: ['./editable-tree.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableTreeComponent implements OnInit {
	public readonly Icons = Icons;
	public readonly TREE_PADDING = 50;

	@Input() tree!: WikiTreeMap;

	public dataSource!: TreeDataSource<WikiTreeFlatNode>;
	public treeControl!: FlatTreeControl<WikiTreeFlatNode>;

	constructor(private wikiState: WikiStateService) {}

	public ngOnInit(): void {
		this.treeControl = new FlatTreeControl<WikiTreeFlatNode>(
			(n) => n.level,
			(n) => !!n.children
		);
		this.dataSource = new TreeDataSource(this.treeControl, [...this.tree.values()]);
	}

	public hasChild(_: number, node: WikiTreeFlatNode): boolean {
		return !!node.children;
	}

	public isRootRubric(_: number, node: WikiTreeFlatNode): boolean {
		return !node.level;
	}
}
