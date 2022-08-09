import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { ContextMenuComponent } from '@shared/component/context-menu/context-menu.component';
import { TableCell } from '../../models';
import { TableComponent } from '../../table.component';

@Component({
	selector: 'do-context-menu-cell',
	template: `
		<button doButton (click)="openContextMenu($event)">
			<mat-icon [svgIcon]="Icons.KebabMenu"></mat-icon>
		</button>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuCellComponent implements OnInit, TableCell<any> {
	public readonly Icons = Icons;
	private contextMenu: ContextMenuComponent;

	public value!: any;

	constructor(table: TableComponent<any>) {
		this.contextMenu = table.contextMenu;
	}

	public ngOnInit(): void {}

	public openContextMenu(event: MouseEvent): void {
		this.contextMenu.openContextMenu(event, this.value);
	}
}
