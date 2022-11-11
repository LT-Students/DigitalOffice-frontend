// Simplified version of MatTreeDataSource without MatFlattener
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl, TreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class TreeDataSource<T, K = T> extends DataSource<T> {
	private readonly _flattenedData = new BehaviorSubject<T[]>([]);
	private readonly _expandedData = new BehaviorSubject<T[]>([]);

	get data() {
		return this._data.value;
	}
	set data(value: T[]) {
		this._data.next(value);
		this._flattenedData.next(value);
		this.treeControl.dataNodes = this._flattenedData.value;
	}
	private readonly _data = new BehaviorSubject<T[]>([]);

	constructor(private treeControl: FlatTreeControl<T, K>, initialData?: T[]) {
		super();

		if (initialData) {
			// Assign the data through the constructor to ensure that all of the logic is executed.
			this.data = initialData;
		}
	}

	connect(collectionViewer: CollectionViewer): Observable<T[]> {
		return merge(collectionViewer.viewChange, this.treeControl.expansionModel.changed, this._flattenedData).pipe(
			map(() => {
				this._expandedData.next(this.expandFlattenedNodes(this._flattenedData.value, this.treeControl));
				return this._expandedData.value;
			})
		);
	}

	disconnect() {}

	private expandFlattenedNodes(nodes: T[], treeControl: TreeControl<T, K>): T[] {
		let results: T[] = [];
		let currentExpand: boolean[] = [];
		currentExpand[0] = true;

		nodes.forEach((node) => {
			let expand = true;
			for (let i = 0; i <= this.treeControl.getLevel(node); i++) {
				expand = expand && currentExpand[i];
			}
			if (expand) {
				results.push(node);
			}
			if (this.treeControl.isExpandable(node)) {
				currentExpand[this.treeControl.getLevel(node) + 1] = treeControl.isExpanded(node);
			}
		});
		return results;
	}
}
