import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Link } from '@shared/component/sidebar/sidebar-types';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
	selector: 'do-sidebar-link',
	templateUrl: './sidebar-item.component.html',
	styleUrls: ['./sidebar-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent implements OnInit {
	@Input() link!: Link;
	@Input()
	set isWideScreen(isWide: any) {
		this._isWideScreen = coerceBooleanProperty(isWide);
	}
	public _isWideScreen = false;

	constructor() {}

	ngOnInit(): void {}
}
