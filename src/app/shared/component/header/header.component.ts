import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
import { CurrentCompanyService } from '@app/services/current-company.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ModalService, ModalWidth } from '@app/services/modal.service';
import { ChangeUserPasswordComponent } from '../../modals/change-user-password/change-user-password.component';

@Component({
	selector: 'do-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	@Input() magnifierLocation: 'right' | 'left' = 'left';
	@Output() public menuClick: EventEmitter<MouseEvent>;

	public portalName: Observable<string>;
	public currentUser: User | null | undefined;

	constructor(
		private _authService: AuthService,
		private _currentUserService: CurrentUserService,
		private _currentCompanyService: CurrentCompanyService,
		private _modalService: ModalService
	) {
		this.menuClick = new EventEmitter();
		this.portalName = this._currentCompanyService.company$.pipe(map((user) => user.portalName));
		this._currentUserService.user$.subscribe((user) => (this.currentUser = user));
	}

	public onLogoutClick(): void {
		this._authService.logout();
	}

	public onMenuClick(event: MouseEvent): void {
		this.menuClick.emit(event);
	}

	public onChangePasswordClick(): void {
		this._modalService.openModal(ChangeUserPasswordComponent, ModalWidth.M);
	}
}
