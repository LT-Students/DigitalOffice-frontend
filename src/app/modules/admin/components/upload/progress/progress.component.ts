import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'do-progress',
	templateUrl: './progress.component.html',
	styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
	@Input() progress = 0;

	constructor() {}

	ngOnInit(): void {}
}
