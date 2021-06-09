import { Input, Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';

@Component({
	selector: 'do-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	@Input() userName;
	@Input() magnifierLocation: 'right' | 'left' = 'left';

	constructor(private authService: AuthService) {}

	ngOnInit() {}

	onLogoutClick() {
		this.authService.logout();
	}
}
