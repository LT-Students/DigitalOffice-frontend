import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { ImageInfo } from '@data/api/user-service/models/image-info';

@Component({
	selector: 'do-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	@Output() public burgerClick = new EventEmitter();
	@Input() userName: string;
	@Input() userId: string;
	@Input() avatar: ImageInfo;
	@Input() magnifierLocation: 'right' | 'left' = 'left';

	constructor(private authService: AuthService) { }

	ngOnInit() { }

	onLogoutClick() {
		this.authService.logout();
	}

	onBurgerClick(event) {
		this.burgerClick.emit(event);
	}
}
