import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from '@app/models/menu-item';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
	selector: 'do-context-menu',
	templateUrl: './context-menu.component.html',
	styleUrls: ['./context-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent implements OnInit {
	@ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
	@Input() items: MenuItem[] = [];

	public object: any;
	public menuPosition = {
		x: 0,
		y: 0,
	};

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {}

	public openContextMenu<T>(event: MouseEvent, object?: T): void {
		const target = (event.target as HTMLElement).getBoundingClientRect();
		this.menuPosition = {
			x: target.right,
			y: target.bottom,
		};
		this.cdr.markForCheck();

		this.object = object;
		this.menuTrigger.openMenu();
	}

	public onMenuClose(): void {
		setTimeout(() => (this.object = null));
	}
}
