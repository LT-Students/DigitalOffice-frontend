import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Icons } from '@shared/modules/icons/icons';
import { WikiStateService } from '../../services';
import { TreeDataSource, WikiTreeFlatNode, WikiTreeMap } from '../../models';

@Component({
	selector: 'do-editable-tree',
	templateUrl: './editable-tree.component.html',
	styleUrls: ['./editable-tree.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('nodeToggle', [
			transition(':enter', [
				style({ height: 0, opacity: 0 }),
				animate(100, style({ height: '*' })),
				animate(200, style({ opacity: 1 })),
			]),
			transition(':leave', [style({ height: '*', opacity: 1 }), animate(100, style({ height: 0, opacity: 0 }))]),
		]),
	],
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
