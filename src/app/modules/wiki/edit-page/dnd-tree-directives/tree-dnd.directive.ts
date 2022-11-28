import { AfterContentInit, ContentChildren, Directive, OnDestroy, OnInit, QueryList, Renderer2 } from '@angular/core';
import { CdkTree } from '@angular/cdk/tree';
import { merge, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { WikiTreeFlatNode } from '../../models';
import { TreeNodeDragDirective } from './tree-node-drag.directive';

@Directive({
	selector: 'cdk-tree[treeDnd]',
})
export class TreeDndDirective implements OnInit, AfterContentInit, OnDestroy {
	private readonly EXPAND_TIMEOUT = 1500;

	@ContentChildren(TreeNodeDragDirective, { descendants: true })
	dragNodes!: QueryList<TreeNodeDragDirective>;

	private destroy$ = new Subject<void>();

	dragNode: WikiTreeFlatNode | null = null;
	dragNodeWasCollapsed = false;
	dragNodeExpandOverNode: TreeNodeDragDirective | null = null;
	dragNodeExpandOverArea = '';
	dragNodeExpandOverTime = 0;

	dataSource = this.cdkTree.dataSource;
	treeControl = this.cdkTree.treeControl;

	constructor(private cdkTree: CdkTree<WikiTreeFlatNode>, private ren: Renderer2) {}

	public ngOnInit(): void {
		this.dataSource = this.cdkTree.dataSource;
		this.treeControl = this.cdkTree.treeControl;
	}

	public ngAfterContentInit(): void {
		this.dragNodes.changes
			.pipe(
				startWith(this.dragNodes),
				switchMap((dragNodes: QueryList<TreeNodeDragDirective>) => {
					const dragNodesEvents = dragNodes
						.map((d) => [
							d.onDragStart.pipe(tap((event) => this.onDragStart(event, d))),
							d.onDragEnd.pipe(tap((event) => this.onDragEnd(event, d))),
							d.onDragOver.pipe(tap((event) => this.onDragOver(event, d))),
							d.onDrop.pipe(tap((event) => this.onDrop(event, d))),
						])
						.reduce((flat, next) => flat.concat(next), []);
					return merge(...dragNodesEvents);
				}),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	onDragStart(event: DragEvent, drag: TreeNodeDragDirective) {
		const node = drag.node;
		if (this.treeControl.isExpanded(node)) {
			this.treeControl.collapse(node);
			this.dragNodeWasCollapsed = true;
		}
		this.dragNode = node;
	}

	onDragOver(event: DragEvent, drag: TreeNodeDragDirective) {
		event.preventDefault();
		const node = drag.node;
		if (node === this.dragNode) {
			return;
		}

		// Handle node expand
		if (drag === this.dragNodeExpandOverNode) {
			if (this.dragNode !== node && !this.treeControl.isExpanded(node)) {
				if (new Date().getTime() - this.dragNodeExpandOverTime > this.EXPAND_TIMEOUT) {
					this.treeControl.expand(node);
				}
			}
		} else {
			this.dragNodeExpandOverNode = drag;
			this.dragNodeExpandOverTime = new Date().getTime();
		}
	}

	onDragEnd(event: DragEvent, drag: TreeNodeDragDirective) {
		if (this.dragNodeWasCollapsed && this.dragNode) {
			this.treeControl.expand(this.dragNode);
		}
		this.dragNode = null;
		this.dragNodeWasCollapsed = false;
		this.dragNodeExpandOverNode = null;
		this.dragNodeExpandOverArea = '';
		this.dragNodeExpandOverTime = 0;
	}

	onDrop(event: DragEvent, drag: TreeNodeDragDirective) {}
}
