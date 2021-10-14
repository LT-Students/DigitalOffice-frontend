import { Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from '@app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentUserService } from '@app/services/current-user.service';
import { CurrentCompanyService } from '@app/services/current-company.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
	selector: 'do-content-container',
	templateUrl: './content-container.component.html',
	styleUrls: ['./content-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentContainerComponent implements OnInit {
	@ViewChild('menu', { read: ElementRef }) menu: ElementRef | undefined;

	public navOpened: boolean;
	public portalName: Observable<string>;
	public departmentId: string | undefined;

	constructor(
		private _currentUserService: CurrentUserService,
		private _authService: AuthService,
		private _currentCompanyService: CurrentCompanyService,
		private _snackBar: MatSnackBar,
		private _router: Router
	) {
		this.navOpened = false;
		this.portalName = this._currentCompanyService.company$.pipe(map((company) => company.portalName));
	}

	ngOnInit() {
		this._currentUserService.user$.subscribe((user) => {
			this.departmentId = user?.department?.id;
		});
	}

	public onStatClick(): void {
		if (this.departmentId) {
			this.closeNav();
			this._router.navigate([`/admin/departments/${this.departmentId}/timelist`]);
		} else {
			this._snackBar.open('Не удаётся получить данные о департаменте', 'Закрыть', { duration: 3000 });
		}
	}

	public onLogoClick(): void {
		this._router.navigate(['/user/attendance']);
	}

	public onLogoutClick(): void {
		this._authService.logout();
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
}
