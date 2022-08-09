import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
	selector: 'do-deselect-all-checkbox',
	template: `
		<div class="flex checkbox" [class.disabled]="disabled" matTooltip="Снять выделение" [matTooltipShowDelay]="500">
			<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<rect x="3" y="3" width="18" height="18" rx="2" />
				<path
					d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
					fill="white"
				/>
			</svg>
		</div>
	`,
	styles: [
		`
			@use 'base/variables' as variables;

			.checkbox {
				rect {
					fill: variables.$accent_color;
				}

				&:not(.disabled):hover rect {
					fill: variables.$accent_default;
				}
			}

			.disabled {
				rect {
					fill: variables.$disabled;
				}
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeselectAllCheckboxComponent implements OnInit {
	@Input()
	set disabled(disabled: any) {
		this._disabled = coerceBooleanProperty(disabled);
	}
	get disabled(): boolean {
		return this._disabled;
	}
	private _disabled = false;

	constructor() {}

	ngOnInit(): void {}
}
