import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, AfterViewInit, OnDestroy } from '@angular/core';

import { AuthService } from '@app/services/auth/auth.service';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentUserService } from '@app/services/current-user.service';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { PortalService } from '@app/services/portal.service';
import { PortalInfo } from '@app/services/admin/admin.service';
import { AppRoutes } from '@app/models/app-routes';
import { DepartmentsRoutes } from '../../../modules/departments/models/departments-routes';

@Component({
	selector: 'do-content-container',
	templateUrl: './content-container.component.html',
	styleUrls: ['./content-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentContainerComponent implements AfterViewInit, OnDestroy {
	@ViewChild('menu', { read: ElementRef }) menu?: ElementRef;
	@ViewChild('scroll') scroll?: ElementRef<HTMLElement>;

	public AppRoutes = AppRoutes;

	public navOpened: boolean;
	public portalName$: Observable<string>;
	public departmentId$: Observable<string>;

	private destroy$ = new Subject<void>();

	constructor(
		private _currentUserService: CurrentUserService,
		private _authService: AuthService,
		private portalService: PortalService,
		private _snackBar: MatSnackBar,
		private router: Router
	) {
		this.navOpened = false;
		this.portalName$ = this.portalService.portal$.pipe(map((portal: PortalInfo) => portal.portalName));
		this.departmentId$ = this._currentUserService.user$.pipe(map((user) => user.department?.id ?? ''));
	}

	public ngAfterViewInit() {
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

	public onStatClick(departmentId: string): void {
		if (departmentId) {
			this.closeNav();
			this.router.navigate([AppRoutes.Departments, departmentId, DepartmentsRoutes.TimeList]);
		} else {
			this._snackBar.open('Не удаётся получить данные о департаменте', 'Закрыть', { duration: 3000 });
		}
	}

	public onMenuClick(event: MouseEvent): void {
		event.stopPropagation();
		this.navOpened = true;
	}

	public closeNav(): void {
		this.navOpened = false;
	}

	public onClick(event: MouseEvent): void {
		const target = event.target as Element;

		if (!this.menu?.nativeElement.contains(target)) {
			this.navOpened = false;
		}
	}

	public ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
