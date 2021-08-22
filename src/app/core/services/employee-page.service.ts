import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { UserService } from '@app/services/user/user.service';

@Injectable({
	providedIn: 'root',
})
export class EmployeePageService {
	private _selectedUser: BehaviorSubject<User>;
	public readonly selectedUser: Observable<User>;

	constructor(private _userService: UserService) {
		this._selectedUser = new BehaviorSubject<User>({});
		this.selectedUser = this._selectedUser.asObservable();
	}
}
