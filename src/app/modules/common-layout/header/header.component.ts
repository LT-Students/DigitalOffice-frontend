import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
import { Observable } from 'rxjs';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { AppRoutes } from '@app/models/app-routes';
import { ChangeUserPasswordComponent } from '@shared/dialogs/change-user-password/change-user-password.component';
import { Icons } from '@shared/modules/icons/icons';
import { FeedbackFormComponent } from '../../feedback/feedback-form/feedback-form.component';

@Component({
	selector: 'do-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	public readonly Icons = Icons;
	public readonly AppRoutes = AppRoutes;

	public currentUser$: Observable<User>;

	constructor(
		private authService: AuthService,
		private currentUser: CurrentUserService,
		private dialog: DialogService
	) {
		this.currentUser$ = this.currentUser.user$;
	}

	public onLogoutClick(): void {
		this.authService.logout();
	}

	public onChangePasswordClick(): void {
		this.dialog.open(ChangeUserPasswordComponent, { width: ModalWidth.M });
	}

	public openFeedbackForm(): void {
		this.dialog.open(FeedbackFormComponent, { width: ModalWidth.M });
	}
}
