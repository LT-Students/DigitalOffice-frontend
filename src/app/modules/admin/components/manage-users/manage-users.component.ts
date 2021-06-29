import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersResponse } from '@data/api/user-service/models/users-response';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { UserService } from '@app/services/user.service';
import { forkJoin, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EducationType } from '@data/api/user-service/models/education-type';

@Component({
	selector: 'do-manage-users',
	templateUrl: './manage-users.component.html',
	styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
	@ViewChild(MatSort) sort: MatSort;

	public displayedColumns: string[];
	public userInfo: UserResponse[];
	public sortedUserInfo:  UserResponse[];
	public studyTypes: EducationType[];
	private _unsubscribe$: Subject<void>;

	constructor(
		private _userService: UserService
	) {
		this._unsubscribe$ = new Subject<void>();
		this.displayedColumns = ['name', 'department', 'role', 'rate', 'status', 'edit'];
		this.userInfo = null;
		this.sortedUserInfo = null;
		this.studyTypes = [EducationType.Offline, EducationType.Online];
	}

	public ngOnInit(): void {
		this._userService.getUsers().pipe(
			switchMap((res: UserInfo[]) => {
				return forkJoin(res.map((userInfo: UserInfo) => this._userService.getUser(userInfo.id)));
			})
		).subscribe((data: UserResponse[]) => {
			this.userInfo = data.slice();
			this.sortedUserInfo = data.slice();
		});
	}

	public onAddEmployeeClick() {
		console.log('onAddEmployeeClick');
	}

	public sortData(sort: Sort): void {
		const data = this.userInfo.slice();
		if (!sort.active || sort.direction === '') {
			this.sortedUserInfo = data;
			return;
		}

		this.sortedUserInfo =  data.sort((a: UserResponse, b: UserResponse) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'name': return this._compare(a.user.firstName, b.user.firstName, isAsc);
				case 'department': return this._compare(a.department?.name, b.department?.name, isAsc);
				case 'role': return this._compare(a.position?.name, b.position?.name, isAsc);
				case 'rate': return this._compare(a.user?.rate, b.user?.rate, isAsc);
				case 'status': return this._compare(a.user.status, b.user.status, isAsc);
				default: return 0;
			}
		});
	}

	private _compare(a: number | string, b: number | string, isAsc: boolean) {
		if (typeof a === 'undefined' || typeof b === 'undefined') { return 0; }
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}
}
