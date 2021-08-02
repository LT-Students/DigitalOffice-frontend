import { Injectable } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { User } from '@app/models/user/user.model';

@Injectable({
	providedIn: 'root',
})
export class AppInitService {
	constructor(private _userService: UserService, private _localStorage: LocalStorageService) {}

	public getCurrentUser(): Promise<any> {
		const userId: string | null = this._localStorage.get('userId');

		return new Promise((resolve) => {
			this._userService.getUserSetCredentials(userId).subscribe().add(resolve);
		});
	}
}
