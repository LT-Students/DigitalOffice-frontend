import { Component, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ButtonToggleGroupComponent } from '@shared/component/button-toggle/button-toggle-group.component';

@Component({
	selector: 'do-button-toggle',
	template:
		'<span class="button" [class.active]="checked" (click)="onButtonClick()"><ng-content></ng-content></span>',
	styleUrls: ['./button-toggle.component.scss'],
})
export class ButtonToggleComponent {
	@Input() value: any;
	@Input()
	public set checked(value: any) {
		this._checked = coerceBooleanProperty(value);
	}
	public get checked(): boolean {
		return this._checked;
	}
	private _checked = false;

	constructor(private buttonToggleGroup: ButtonToggleGroupComponent) {}

	public onButtonClick(): void {
		if (!this._checked) {
			this._checked = !this._checked;
			this.buttonToggleGroup.changeSelection(this);
		}
	}
}
