import { Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import { UserService } from '@app/services/user/user.service';
import { AuthService } from '@app/services/auth/auth.service';
import { Router } from '@angular/router';
import { CompanyService } from '@app/services/company/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'do-content-container',
	templateUrl: './content-container.component.html',
	styleUrls: ['./content-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentContainerComponent implements OnInit {
	@ViewChild('menu', { read: ElementRef }) menu: ElementRef | undefined;

	public navOpened: boolean;
	public portalName: string;
	public departmentId: string | undefined;

	constructor(
		private _userService: UserService,
		private _authService: AuthService,
		private _companyService: CompanyService,
		private _snackBar: MatSnackBar,
		private _router: Router
	) {
		this.navOpened = false;
		this.portalName = this._companyService.getPortalName();
	}

	ngOnInit() {
		this._userService.currentUser$.subscribe((user) => {
			this.departmentId = user?.department?.id;
		});
	}

	public onStatClick(): void {
		if (this.departmentId) {
			this.closeNav();
			this._router.navigate([`/admin/departments/${this.departmentId}/timelist`]);
		} else this._snackBar.open('Не удаётся получить данные о департаменте', 'Закрыть', { duration: 3000 });
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
