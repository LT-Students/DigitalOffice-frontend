import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { UserService } from '@app/services/user/user.service';
import { AuthService } from '@app/services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '@app/models/user/user.model';
import { CompanyService } from '@app/services/company/company.service';

@Component({
	selector: 'do-content-container',
	templateUrl: './content-container.component.html',
	styleUrls: ['./content-container.component.scss'],
})
export class ContentContainerComponent implements OnInit {
	@ViewChild('menu', { read: ElementRef }) menu: ElementRef;

	public user: User;
	public navOpened: boolean;
	public portalName: string;

	constructor(
		private _userService: UserService,
		private _authService: AuthService,
		private _companyService: CompanyService,
		private _router: Router
	) {
		this.navOpened = false;
		this.portalName = this._companyService.getPortalName();
	}

	ngOnInit() {
		const currentUser: User = this._userService.getCurrentUser();
		this.user = currentUser
			? currentUser
			: new User({
					body: { user: { firstName: 'сотрудник' } },
			  });
	}

	public onLogoClick() {
		this._router.navigate(['/user/attendance']);
	}

	onLogoutClick() {
		this._authService.logout();
	}

	onMenuClick(event: MouseEvent) {
		event.stopPropagation();
		this.navOpened = true;
	}

	closeNav() {
		this.navOpened = false;
	}

	onClick(event: MouseEvent) {
		const target = event.target as Element;

		if (!this.menu.nativeElement.contains(target)) {
			this.navOpened = false;
		}
	}
}
