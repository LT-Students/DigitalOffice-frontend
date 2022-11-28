import {
	AfterViewInit,
	ComponentRef,
	ContentChildren,
	Directive,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	QueryList,
	ViewContainerRef,
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkTreeNode } from '@angular/cdk/tree';
import { fromEvent, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { WikiTreeFlatNode } from '../../models';
import { TreeNodeDragHandleDirective } from './tree-node-drag-handle.directive';
import { DropIndicatorComponent } from './drop-indicator.component';
import { TreeDndDirective } from './tree-dnd.directive';

export enum DropPosition {
	Up = 'up',
	Down = 'down',
	Inside = 'inside',
}

@Directive({
	selector: '[treeNodeDrag]',
})
export class TreeNodeDragDirective implements OnInit, AfterViewInit, OnDestroy {
	@ContentChildren(TreeNodeDragHandleDirective, { descendants: true })
	handles!: QueryList<TreeNodeDragHandleDirective>;

	@Output() onDragStart = new EventEmitter<DragEvent>();
	@Output() onDragOver = new EventEmitter<DragEvent>();
	@Output() onDragEnd = new EventEmitter<DragEvent>();
	@Output() onDrop = new EventEmitter<DragEvent>();

	@Input()
	set disabled(disabled: BooleanInput) {
		this._disabled = coerceBooleanProperty(disabled);
	}
	private _disabled = false;

	@Input() node!: WikiTreeFlatNode;

	public get element(): HTMLElement {
		return this.elementRef.nativeElement;
	}

	private dropIndicator: ComponentRef<DropIndicatorComponent> | null = null;
	private destroy$ = new Subject<void>();

	constructor(
		private cdkNode: CdkTreeNode<WikiTreeFlatNode>,
		private dndTree: TreeDndDirective,
		private elementRef: ElementRef,
		private vcr: ViewContainerRef
	) {}

	public ngOnInit(): void {
		if (!this.node) {
			this.node = this.cdkNode.data;
		}
	}

	public ngAfterViewInit(): void {
		this.handles.changes
			.pipe(
				startWith(this.handles),
				map((handles: QueryList<TreeNodeDragHandleDirective>) =>
					handles.map((h) => h.elementRef.nativeElement)
				),
				takeUntil(this.destroy$)
			)
			.subscribe((handles: HTMLElement[]) => {
				handles = handles.length ? handles : [this.element];
				fromEvent<MouseEvent>(handles, 'mousedown')
					.pipe(takeUntil(this.destroy$))
					.subscribe(() => {
						if (!this._disabled) {
							this.element.draggable = true;
						}
					});
				this.setDragElementListeners();
			});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private setDragElementListeners(): void {
		fromEvent<DragEvent>(this.element, 'dragstart')
			.pipe(takeUntil(this.destroy$))
			.subscribe((e: DragEvent) => this.onDragStart.emit(e));

		fromEvent<DragEvent>(this.element, 'dragover')
			.pipe(takeUntil(this.destroy$))
			.subscribe((e: DragEvent) => {
				this.onDragOver.emit(e);
				this.handleDragOver(e);
			});

		fromEvent<DragEvent>(this.element, 'dragend')
			.pipe(takeUntil(this.destroy$))
			.subscribe((e: DragEvent) => {
				this.element.draggable = false;
				this.onDragEnd.emit(e);
			});

		fromEvent<DragEvent>(this.element, 'dragleave')
			.pipe(takeUntil(this.destroy$))
			.subscribe((e: DragEvent) => {
				this.removeIndicator();
			});

		fromEvent<DragEvent>(this.element, 'drop')
			.pipe(takeUntil(this.destroy$))
			.subscribe((e: DragEvent) => {
				this.removeIndicator();
				this.onDrop.emit(e);
			});
	}

	private handleDragOver(event: DragEvent): void {
		if (this.dndTree.dragNode === this.node || !event.target) return;
		const target = event.target as HTMLElement;
		const percentageY = event.offsetY / target.clientHeight;
		if (percentageY < 0.4) {
			this.renderIndicator(DropPosition.Up);
		} else if (percentageY > 0.6) {
			this.renderIndicator(DropPosition.Down);
		} else {
			this.removeIndicator();
		}
	}

	private renderIndicator(position: DropPosition): void {
		if (!this.dropIndicator) {
			this.dropIndicator = this.vcr.createComponent(DropIndicatorComponent);
			this.dropIndicator.instance.dropPosition = position;
		}
	}

	private removeIndicator(): void {
		if (this.dropIndicator) {
			this.vcr.clear();
			this.dropIndicator = null;
		}
	}
}
