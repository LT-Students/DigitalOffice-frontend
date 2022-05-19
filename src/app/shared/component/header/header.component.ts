import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
import { Observable } from 'rxjs';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { AppRoutes } from '@app/models/app-routes';
import { ChangeUserPasswordComponent } from '../../modals/change-user-password/change-user-password.component';

@Component({
	selector: 'do-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	public AppRoutes = AppRoutes;

	public currentUser$: Observable<User>;

	constructor(
		private _authService: AuthService,
		private _currentUserService: CurrentUserService,
		private _modalService: DialogService
	) {
		this.currentUser$ = this._currentUserService.user$;
	}

	public onLogoutClick(): void {
		this._authService.logout();
	}

	public onChangePasswordClick(): void {
		this._modalService.openModal(ChangeUserPasswordComponent, ModalWidth.M);
	}
}
