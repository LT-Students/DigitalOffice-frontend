import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { ImageInfo } from '@data/api/user-service/models/image-info';

@Component({
	selector: 'do-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	@Input() userName: string;
	@Input() userId: string;
	@Input() avatar: ImageInfo;
	@Input() portalName: string;
	@Input() magnifierLocation: 'right' | 'left' = 'left';
	@Output() public menuClick: EventEmitter<MouseEvent>;

	constructor(private authService: AuthService) {
		this.menuClick = new EventEmitter();
	}

	ngOnInit() { }

	onLogoutClick() {
		this.authService.logout();
	}

	onMenuClick(event: MouseEvent) {
		this.menuClick.emit(event);
	}
}
