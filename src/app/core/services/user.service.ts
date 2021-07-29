import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { CreateUserRequest } from '@data/api/user-service/models/create-user-request';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { LocalStorageService } from '@app/services/local-storage.service';
import {
	FindResultResponseUserInfo,
	OperationResultResponseUserResponse,
	OperationResultStatusType,
	PatchUserDocument,
} from '@data/api/user-service/models';
import { HttpErrorResponse } from '@angular/common/http';
import { Moment } from 'moment';
import { getUserRequest } from '@app/types/get-user-request.interface';
import { User } from '@app/models/user/user.model';

@Injectable()
export class UserService {
	public selectedUser: BehaviorSubject<User>;

	constructor(private userApiService: UserApiService, private route: ActivatedRoute, private localStorageService: LocalStorageService) {
		this.selectedUser = new BehaviorSubject<User>(null);
	}

	public getUser(params: getUserRequest): Observable<User> {
		return this.userApiService.getUser(params).pipe(switchMap((userResponse: OperationResultResponseUserResponse) => of(new User(userResponse))));
	}

	public getUserSetCredentials(userId: string): Observable<User> {
		const params: getUserRequest = {
			userId: userId,
			includedepartment: true,
			includeposition: true,
			includeoffice: true,
			includecommunications: true,
			includerole: true,
			includeimages: true,
		};

		return this.getUser(params).pipe(tap(this._setUser.bind(this)));
	}

	public getUsers(skipPages = 0, pageSize = 10, departmentId?: string): Observable<FindResultResponseUserInfo> {
		return this.userApiService.findUsers({ skipCount: skipPages, takeCount: pageSize, departmentid: departmentId });
	}

	public isAdmin(): boolean {
		//TODO использовать getCurrentUser для получения юзера
		const user: User = this.localStorageService.get('user');
		return user ? user.user.isAdmin : false;
	}

	public getCurrentUser(): User | null {
		const user: User = this.localStorageService.get('user');
		return user ? user : null;
	}

	public createUser(params: CreateUserRequest): Observable<OperationResultResponse> {
		return this.userApiService.createUser({ body: params }).pipe(
			switchMap((res: OperationResultResponse) => {
				return res.status === OperationResultStatusType.Failed || res instanceof HttpErrorResponse ? throwError(res) : of(res);
			}),
			catchError((error) => throwError(error))
		);
	}

	public disableUser(userId: string): Observable<OperationResultResponse> {
		const disableRequest: PatchUserDocument = {
			op: 'replace',
			path: '/IsActive',
			value: false,
		};
		return this.userApiService.editUser({ userId, body: [disableRequest] });
	}

	private _setUser(user: User): void {
		this.localStorageService.set('user', user);
		this.selectedUser.next(user);
	}

	public editUser(userId: string, changes: {path: string, value: any }[]): Observable<OperationResultResponse> {
		const editRequest: Array<PatchUserDocument> = [];
		changes.forEach((item: {path: string, value: any }) => {
			switch (item.path) {
				case 'firstName':
					editRequest.push({
						op: 'replace',
						path: '/FirstName',
						value: item.value,
					});
					break;
				case 'lastName':
					editRequest.push({
						op: 'replace',
						path: '/LastName',
						value: item.value,
					});
					break;
				case 'middleName':
					editRequest.push({
						op: 'replace',
						path: '/MiddleName',
						value: item.value,
					});
					break;
				case 'rate':
					editRequest.push({
						op: 'replace',
						path: '/Rate',
						value: item.value,
					});
					break;
				case 'status':
					editRequest.push({
						op: 'replace',
						path: '/Status',
						value: item.value,
					});
					break;
				case 'startWorkingAt':
					const date: Moment = item.value;
					editRequest.push({
						op: 'replace',
						path: '/StartWorkingAt',
						value: date.toISOString(),
					});
					break;
				case 'dateOfBirth':
					const dateOfBirth: Moment = item.value;
					editRequest.push({
						op: 'replace',
						path: '/DateOfBirth',
						value: dateOfBirth.toISOString(),
					});
					break;
				case 'department':
					editRequest.push({
						op: 'replace',
						path: '/DepartmentId',
						value: item.value,
					});
					break;
				case 'position':
					editRequest.push({
						op: 'replace',
						path: '/PositionId',
						value: item.value,
					});
					break;
				case 'office':
					editRequest.push({
						op: 'replace',
						path: '/OfficeId',
						value: item.value,
					});
					break;
				case 'photo':
					editRequest.push({
						op: 'replace',
						path: '/AvatarImage',
						value: item.value,
					});
					break;
				case 'about':
					editRequest.push({
						op: 'replace',
						path: '/About',
						value: item.value,
					});
					break;
				case 'city':
					editRequest.push({
						op: 'replace',
						path: '/City',
						value: item.value,
					});
					break;
				case 'role':
					editRequest.push({
						op: 'replace',
						path: '/RoleId',
						value: item.value,
					});
					break;
				case 'gender':
					editRequest.push({
						op: 'replace',
						path: '/Gender',
						value: item.value,
					});
					break;
				default:
					break;
			}
		});

		return this.userApiService.editUser({ userId, body: editRequest });
	}
}
