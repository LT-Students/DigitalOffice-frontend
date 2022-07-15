import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from '@app/models/menu-item';
import { MatMenuTrigger, MenuPositionX, MenuPositionY } from '@angular/material/menu';

@Component({
	selector: 'do-context-menu',
	templateUrl: './context-menu.component.html',
	styleUrls: ['./context-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent implements OnInit {
	private static uniqueId = 0;

	@ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
	@Input() items: MenuItem[] = [];
	@Input() xPosition: MenuPositionX = 'after';
	@Input() yPosition: MenuPositionY = 'below';

	public object: any;
	public menuPosition = {
		x: 0,
		y: 0,
		width: 0,
	};
	public readonly itemId = ContextMenuComponent.uniqueId++;

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {}

	public openContextMenu<T>(event: MouseEvent, object?: T): void {
		const target = (event.currentTarget as HTMLElement).getBoundingClientRect();
		this.menuPosition = {
			x: target.left,
			y: target.bottom,
			width: target.width,
		};
		this.cdr.markForCheck();

		this.object = object;
		this.menuTrigger.openMenu();
	}

	public onMenuClose(): void {
		setTimeout(() => (this.object = null));
	}
}
