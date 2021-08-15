//@ts-nocheck
import { Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'do-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
	@Input() magnifierLocation: 'right' | 'left' = 'left';
	@Input() placeholder = '';
	@Output() searchClick = new EventEmitter<string>();
	@Output() searchInput = new EventEmitter<string>();

	constructor() {}

	ngOnInit(): void {}

	onSearchClick(value: string): void {
		this.searchClick.emit(value);
	}

	onSearchInput(event: Event) {
		const text = event.target.value;
		this.searchInput.emit(text);
	}
}
