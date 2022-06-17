import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableCell, TextCellParams } from '../../models/table-cell';

@Component({
	selector: 'do-text',
	template: ` <div class="text" ellipsis [style.max-height.px]="lineClamp * 18">{{ value | placeholder }}</div>`,
	styles: [
		`
			.text {
				line-height: 18px;
				word-break: break-all;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent implements OnInit, TableCell<string> {
	public value = '';
	public set params(params: TextCellParams) {
		this.lineClamp = params?.lineClamp ?? -1;
	}
	public lineClamp = -1;

	constructor() {}

	ngOnInit(): void {}
}
