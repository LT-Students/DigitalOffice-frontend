import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	NavigationCancel,
	NavigationEnd,
	NavigationError,
	NavigationStart,
	Router,
	RouterEvent,
} from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class LoadingBarRoutingModule {
	private _urlIgnore = ['/', '/admin/dashboard'];

	constructor(router: Router, loader: LoadingBarService) {
		const ref = loader.useRef('router');
		router.events.subscribe((event) => {
			const navState = this.getCurrentNavigationState(router);
			if (
				(navState && navState.ignoreLoadingBar) ||
				(event instanceof RouterEvent && this._urlIgnore.includes(event.url))
			) {
				return;
			}

			if (event instanceof NavigationStart) {
				ref.start();
			}

			if (
				event instanceof NavigationError ||
				event instanceof NavigationEnd ||
				event instanceof NavigationCancel
			) {
				ref.complete();
			}
		});
	}

	private getCurrentNavigationState(router: any) {
		// `getCurrentNavigation` only available in angular `7.2`
		const currentNavigation = router.getCurrentNavigation && router.getCurrentNavigation();
		if (currentNavigation && currentNavigation.extras) {
			return currentNavigation.extras.state;
		}

		return {};
	}
}
