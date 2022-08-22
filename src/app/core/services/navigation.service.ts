import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class NavigationService {
	private history: string[] = [];

	constructor(private router: Router, private location: Location) {
		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd) {
				this.history.push(event.urlAfterRedirects);
			}
		});
	}

	public back(fallback = '/', relativeTo?: ActivatedRoute): void {
		this.history.pop();
		if (this.history.length > 0) {
			this.location.back();
		} else {
			this.router.navigate([fallback], { relativeTo: relativeTo });
		}
	}
}
