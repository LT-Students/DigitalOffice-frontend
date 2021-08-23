import { Input, Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { UserService } from '@app/services/user/user.service';
import { CompanyService } from '@app/services/company/company.service';
import { User } from '@app/models/user/user.model';

@Component({
	selector: 'do-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
	@Input() magnifierLocation: 'right' | 'left' = 'left';
	@Output() public menuClick: EventEmitter<MouseEvent>;

	public portalName: string;
	public currentUser: User | null | undefined;

	constructor(private _authService: AuthService, private _userService: UserService, private _companyService: CompanyService) {
		this.menuClick = new EventEmitter();
		this.portalName = _companyService.getPortalName();
		_userService.currentUser$.subscribe((user) => this.currentUser = user);
	}

	ngOnInit() {}

	onLogoutClick() {
		this._authService.logout();
	}

	onMenuClick(event: MouseEvent) {
		this.menuClick.emit(event);
	}
}
