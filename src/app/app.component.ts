//@ts-nocheck
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UtilitiesService } from '@app/services/utilities.service';

@Component({
	selector: 'do-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
	private subscription: Subscription;

	constructor(private router: Router, private utilities: UtilitiesService) {}

	@HostListener('document:click', ['$event']) handleDocumentClick(event: MouseEvent): void {
		this.utilities.setClickTarget(event.target);
	}

	@HostListener('document:keydown.escape') handleEscapePress(): void {
		this.utilities.notifyEscapePressed();
	}

	public ngOnInit(): void {
		this.subscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
			const element = document.querySelector('mat-sidenav-content') || window;
			element.scrollTo(0, 0);
		});
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
