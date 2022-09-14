import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { TableCell } from '../../models';
import { TableCellComponent } from '../../table-cell.component';

export class TextCellParams {
	lineClamp?: number;
	prefixIcon?: (o: any) => Icons;
	suffixIcon?: (o: any) => Icons;

	constructor(params?: { lineClamp?: number; prefixIcon?: (o: any) => Icons; suffixIcon?: (o: any) => Icons }) {
		this.lineClamp = params?.lineClamp;
		this.prefixIcon = params?.prefixIcon;
		this.suffixIcon = params?.suffixIcon;
	}
}

@Component({
	selector: 'do-text',
	template: `<div
		class="text"
		doTruncateTooltip
		[matTooltip]="value"
		matTooltipShowDelay="300"
		matTooltipPosition="above"
		[style.-webkit-line-clamp]="lineClamp"
	>
		<mat-icon
			*ngIf="prefixIcon as iconGetter"
			class="text-secondary_default icon prefix"
			[svgIcon]="row | execute: iconGetter"
		></mat-icon
		>{{ value | placeholder
		}}<mat-icon
			*ngIf="suffixIcon as iconGetter"
			class="text-secondary_default icon suffix"
			[svgIcon]="row | execute: iconGetter"
		></mat-icon>
	</div>`,
	styles: [
		`
			.text {
				line-height: 18px;
				word-break: break-all;
				white-space: pre-line;
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
			}

			.icon {
				vertical-align: middle;
			}

			.prefix {
				margin-right: 8px;
			}

			.suffix {
				margin-left: 8px;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent implements OnInit, TableCell<string> {
	public value = '';
	public set params(params: TextCellParams) {
		this.lineClamp = params?.lineClamp;
		this.prefixIcon = params?.prefixIcon;
		this.suffixIcon = params?.suffixIcon;
	}
	public lineClamp?: number;
	public prefixIcon?: (o: any) => Icons;
	public suffixIcon?: (o: any) => Icons;
	public row: any;

	constructor(tableCell: TableCellComponent) {
		this.row = tableCell.row;
	}

	ngOnInit(): void {}
}
