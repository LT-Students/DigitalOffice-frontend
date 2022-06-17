import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons } from '@shared/features/icons/icons';
import { TableCell } from '../../models/table-cell';

@Component({
	selector: 'do-status',
	template: '<mat-icon [svgIcon]="Icons.Status" [style.color]="value"></mat-icon>',
	styles: [''],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent implements OnInit, TableCell<any> {
	public Icons = Icons;
	public value = 'black';
	constructor() {}

	ngOnInit(): void {}
}
