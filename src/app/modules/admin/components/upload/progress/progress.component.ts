//@ts-nocheck
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'do-progress',
	templateUrl: './progress.component.html',
	styleUrls: ['./progress.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent implements OnInit {
	@Input() progress = 0;

	constructor() {}

	ngOnInit(): void {}
}
