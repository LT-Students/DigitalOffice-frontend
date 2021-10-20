import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'do-empty-list',
	templateUrl: './empty-list.component.html',
	styleUrls: ['./empty-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyListComponent implements OnInit {
	@Input() emptyMessage: string;
	constructor() {
		this.emptyMessage = 'Нет данных';
	}

	ngOnInit(): void {}
}
