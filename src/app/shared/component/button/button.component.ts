import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'do-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
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
