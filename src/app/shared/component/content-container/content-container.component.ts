import { Component, OnInit } from '@angular/core';

import { UserService } from '@app/services/user.service';
import { UserInfo } from '@data/api/user-service/models';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'do-content-container',
	templateUrl: './content-container.component.html',
	styleUrls: ['./content-container.component.scss'],
})
export class ContentContainerComponent implements OnInit {
	user: UserInfo;

	constructor(private userService: UserService, private authService: AuthService, private _router: Router) {}

	ngOnInit() {
		this.user = this.userService.getCurrentUser();
		if (!this.user) {
			this.user = { firstName: 'сотрудник', lastName: 'сотрудник' };
		}
	}

	public onLogoClick() {
		this._router.navigate(['/user/attendance']);
	}

	onLogoutClick() {
		this.authService.logout();
	}
}
