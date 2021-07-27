import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
	@ViewChild('menu', { read: ElementRef }) menu: ElementRef;

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
