import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableCell, TextCellParams } from '../../models';

@Component({
	selector: 'do-text',
	template: `<div class="text" [style.-webkit-line-clamp]="lineClamp">{{ value | placeholder }}</div>`,
	styles: [
		`
			.text {
				line-height: 18px;
				word-break: break-all;
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent implements OnInit, TableCell<string> {
	public value = '';
	public set params(params: TextCellParams) {
		this.lineClamp = params?.lineClamp;
	}
	public lineClamp?: number;

	constructor() {}

	ngOnInit(): void {}
}
