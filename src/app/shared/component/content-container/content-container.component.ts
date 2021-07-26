import { Component, OnInit } from '@angular/core';

import { UserService } from '@app/services/user.service';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';
import { User } from '@app/models/user.model';

@Component({
	selector: 'do-content-container',
	templateUrl: './content-container.component.html',
	styleUrls: ['./content-container.component.scss'],
})
export class ContentContainerComponent implements OnInit {
	user: User;
	public navOpened: boolean;

	constructor(private _userService: UserService, private _authService: AuthService, private _router: Router) {
		this.navOpened = false;
	}

	ngOnInit() {
		const currentUser: User = this._userService.getCurrentUser();
		this.user = (currentUser) ? currentUser : new User({
			body: { user: { firstName: 'сотрудник' } }
		});
	}

	public onLogoClick() {
		this._router.navigate(['/user/attendance']);
	}

	onLogoutClick() {
		this._authService.logout();
	}

	onMenuClick(event: MouseEvent) {
		event.stopPropagation()
		this.navOpened = true;
	}

	closeNav() {
		this.navOpened = false;
	}

	onClick(event: PointerEvent) {
		const target = event.target as Element;
		if (this.navOpened === true && target.closest('.sidenav__nav') === null) {
			this.closeNav()
		}
	}
}
