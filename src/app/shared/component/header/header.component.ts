import { Input, Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { CompanyService } from '@app/services/company/company.service';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';

@Component({
	selector: 'do-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	@Input() magnifierLocation: 'right' | 'left' = 'left';
	@Output() public menuClick: EventEmitter<MouseEvent>;

	public portalName: string;
	public currentUser: User | null | undefined;

	constructor(
		private _authService: AuthService,
		private _currentUserService: CurrentUserService,
		private _companyService: CompanyService
	) {
		this.menuClick = new EventEmitter();
		this.portalName = this._companyService.getPortalName();
		this._currentUserService.currentUser$.subscribe((user) => (this.currentUser = user));
	}

	public onLogoutClick(): void {
		this._authService.logout();
	}

	public onMenuClick(event: MouseEvent): void {
		this.menuClick.emit(event);
	}
}
