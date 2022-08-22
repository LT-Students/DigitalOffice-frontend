import { Component, EventEmitter, HostBinding, Input, OnInit, Optional, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ButtonToggleGroupComponent } from '@shared/component/button-toggle/button-toggle-group.component';

export class ButtonToggleChange {
	value: any;
	checked: boolean;

	constructor(toggle: ButtonToggleComponent) {
		this.value = toggle.value;
		this.checked = toggle.checked;
	}
}

@Component({
	selector: 'do-button-toggle',
	template:
		'<span class="button" [class.active]="checked" (click)="onButtonClick()"><ng-content></ng-content></span>',
	styleUrls: ['./button-toggle.component.scss'],
})
export class ButtonToggleComponent implements OnInit {
	private static uniqueId = 0;

	@Output() toggleChange = new EventEmitter<{ value: any; checked: boolean }>();

	@Input() value: any;
	@Input()
	public set checked(value: any) {
		this._checked = coerceBooleanProperty(value);
	}
	public get checked(): boolean {
		return this._checked;
	}
	private _checked = false;

	@HostBinding('attr.data-test')
	private readonly id = `button-toggle-${ButtonToggleComponent.uniqueId++}`;

	private isSingleSelector = false;

	constructor(@Optional() private buttonToggleGroup: ButtonToggleGroupComponent) {}

	public ngOnInit(): void {
		this.isSingleSelector = !!this.buttonToggleGroup;
	}

	public onButtonClick(): void {
		const newChecked = this.isSingleSelector ? true : !this._checked;
		if (this._checked !== newChecked) {
			this._checked = newChecked;
			if (this.buttonToggleGroup) {
				this.buttonToggleGroup.changeSelection(this, this._checked);
			}
		}
		this.toggleChange.emit(new ButtonToggleChange(this));
	}
}
