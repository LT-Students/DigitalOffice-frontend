import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, AfterViewInit, OnDestroy } from '@angular/core';

import { Event, NavigationEnd, Router } from '@angular/router';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
	selector: 'do-content-container',
	templateUrl: './content-container.component.html',
	styleUrls: ['./content-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentContainerComponent implements AfterViewInit, OnDestroy {
	@ViewChild('scroll') scroll?: ElementRef<HTMLElement>;

	public isWideScreen$ = this.responsive
		.observe(Breakpoints.XLarge)
		.pipe(map((state: BreakpointState) => state.matches));
	private destroy$ = new Subject<void>();

	constructor(private router: Router, private responsive: BreakpointObserver) {}

	public ngAfterViewInit(): void {
		this.router.events
			.pipe(
				tap((event: Event) => {
					if (event instanceof NavigationEnd) {
						this.scroll?.nativeElement.scroll({ top: 0 });
					}
				}),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
