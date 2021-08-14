//@ts-nocheck
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'do-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
	@Input() className: string;
	@Input() title: string;
	@Output() buttonClicked = new EventEmitter();

	constructor() {}
	ngOnInit() {}

	onButtonClicked(mouseEvent: MouseEvent) {
		this.buttonClicked.emit(mouseEvent);
	}
}
