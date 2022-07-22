import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Link } from '@shared/component/sidebar/sidebar-types';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { IsActiveMatchOptions } from '@angular/router';

@Component({
	selector: 'do-sidebar-link',
	templateUrl: './sidebar-item.component.html',
	styleUrls: ['./sidebar-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent implements OnInit {
	public isActiveLinkOptions: IsActiveMatchOptions = {
		paths: 'exact',
		queryParams: 'ignored',
		matrixParams: 'exact',
		fragment: 'exact',
	};

	@Input() link!: Link;
	@Input()
	set isWideScreen(isWide: any) {
		this._isWideScreen = coerceBooleanProperty(isWide);
	}
	public _isWideScreen = false;

	constructor() {}

	ngOnInit(): void {}
}
