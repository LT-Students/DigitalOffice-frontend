import { Component, OnInit } from '@angular/core';

import { UserService } from '@app/services/user.service';
import { UserInfo } from '@data/api/user-service/models';
import { User } from '@app/models/user.model';

@Component({
	selector: 'do-content-container',
	templateUrl: './content-container.component.html',
	styleUrls: ['./content-container.component.scss'],
})
export class ContentContainerComponent implements OnInit {
	user: User;

	constructor(private userService: UserService) {}

	ngOnInit() {
		//TODO нужно подумать, как возвращать экземпляр класса User, а не duck type
		this.user = this.userService.getCurrentUser();
		// if (!this.user) {
		// 	this.user = { firstName: 'сотрудник', lastName: 'сотрудник' };
		// }
	}
}
