//@ts-nocheck
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'do-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
	private _subscription: Subscription;
	public user = {
		firstName: 'Ия',
	};

	constructor(private _router: Router) {}

	public ngOnInit(): void {
		this._subscription = this._router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe(() => {
				const element = document.querySelector('mat-sidenav-content') || window;
				element.scrollTo(0, 0);
			});
	}

	public ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
