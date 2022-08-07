import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { TableCell } from '../../models';

@Component({
	selector: 'do-icon',
	template: `<mat-icon class="text-secondary_default vertical-align_middle" [svgIcon]="value"></mat-icon>`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit, TableCell<Icons> {
	public value!: Icons;

	constructor() {}

	ngOnInit(): void {}
}
