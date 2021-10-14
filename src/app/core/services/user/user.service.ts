import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { CreateUserRequest } from '@data/api/user-service/models/create-user-request';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import {
	FindResultResponseUserInfo,
	OperationResultResponseUserResponse,
	OperationResultStatusType,
	PatchUserDocument,
} from '@data/api/user-service/models';
import { HttpErrorResponse } from '@angular/common/http';
import { Moment } from 'moment';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { User } from '@app/models/user/user.model';
import { IEditUserRequest } from '@app/types/edit-user-request.interface';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private _currentUser: BehaviorSubject<User | null>;
	public readonly currentUser$: Observable<User | null>;

	constructor(private _userApiService: UserApiService) {
		this._currentUser = new BehaviorSubject<User | null>(null);
		this.currentUser$ = this._currentUser.asObservable();
	}

	public getUser(params: IGetUserRequest): Observable<User> {
		return this._userApiService
			.getUser(params)
			.pipe(switchMap((userResponse: OperationResultResponseUserResponse) => of(new User(userResponse))));
	}

	public findUsers(skipPages = 0, pageSize = 10, departmentId?: string): Observable<FindResultResponseUserInfo> {
		return this._userApiService.findUsers({
			skipCount: skipPages,
			takeCount: pageSize,
			departmentid: departmentId,
		});
	}

	public createUser(params: CreateUserRequest): Observable<OperationResultResponse> {
		return this._userApiService.createUser({ body: params }).pipe(
			switchMap((res: OperationResultResponse) => {
				return res.status === OperationResultStatusType.Failed || res instanceof HttpErrorResponse
					? throwError(res)
					: of(res);
			}),
			catchError((error) => throwError(error))
		);
	}

	public editUser(userId: string, changes: { path: string; value: any }[]): Observable<OperationResultResponse> {
		const body: PatchUserDocument[] = [];
		/* TODO: сделать функцию, которая маппит название контрола в path */
		changes.forEach((item: { path: string; value: any }) => {
			switch (item.path) {
				case 'firstName':
					body.push({
						op: 'replace',
						path: '/FirstName',
						value: item.value,
					});
					break;
				case 'lastName':
					body.push({
						op: 'replace',
						path: '/LastName',
						value: item.value,
					});
					break;
				case 'middleName':
					body.push({
						op: 'replace',
						path: '/MiddleName',
						value: item.value,
					});
					break;
				case 'rate':
					body.push({
						op: 'replace',
						path: '/Rate',
						value: item.value,
					});
					break;
				case 'status':
					body.push({
						op: 'replace',
						path: '/Status',
						value: item.value,
					});
					break;
				case 'startWorkingAt':
					const date: Moment = item.value;
					const changedDate = new Date(date.toDate().setDate(date.toDate().getDate() + 1));
					body.push({
						op: 'replace',
						path: '/StartWorkingAt',
						value: changedDate.toISOString(),
					});
					break;
				case 'dateOfBirth':
					const dateOfBirth: Moment = item.value;
					const changedDateOfBirth = new Date(
						dateOfBirth.toDate().setDate(dateOfBirth.toDate().getDate() + 1)
					);
					body.push({
						op: 'replace',
						path: '/DateOfBirth',
						value: changedDateOfBirth.toISOString(),
					});
					break;
				case 'department':
					body.push({
						op: 'replace',
						path: '/DepartmentId',
						value: item.value,
					});
					break;
				case 'position':
					body.push({
						op: 'replace',
						path: '/PositionId',
						value: item.value,
					});
					break;
				case 'office':
					body.push({
						op: 'replace',
						path: '/OfficeId',
						value: item.value,
					});
					break;
				case 'photo':
					body.push({
						op: 'replace',
						path: '/AvatarImage',
						value: item.value,
					});
					break;
				case 'about':
					body.push({
						op: 'replace',
						path: '/About',
						value: item.value,
					});
					break;
				case 'city':
					body.push({
						op: 'replace',
						path: '/City',
						value: item.value,
					});
					break;
				case 'role':
					body.push({
						op: 'replace',
						path: '/RoleId',
						value: item.value,
					});
					break;
				case 'gender':
					body.push({
						op: 'replace',
						path: '/Gender',
						value: item.value,
					});
					break;
				default:
					break;
			}
		});

		const params: IEditUserRequest = {
			userId,
			body,
		};

		return this._userApiService.editUser(params);
	}

	public disableUser(userId: string): Observable<OperationResultResponse> {
		const params: IEditUserRequest = {
			userId: userId,
			body: [
				{
					op: 'replace',
					path: '/IsActive',
					value: false,
				},
			],
		};

		return this._userApiService.editUser(params);
	}

	public activateUser(userId: string): Observable<OperationResultResponse> {
		const params: IEditUserRequest = {
			userId: userId,
			body: [
				{
					op: 'replace',
					path: '/IsActive',
					value: true,
				},
			],
		};

		return this._userApiService.editUser(params);
	}

	public getUserSetCredentials(userId?: string): Observable<User> {
		const params: IGetUserRequest = {
			userId: userId,
			includedepartment: true,
			includeposition: true,
			includeoffice: true,
			includecommunications: true,
			includerole: true,
			includeimages: true,
			includeprojects: true,
		};

		return this.getUser(params).pipe(
			tap(this._setUser.bind(this)),
			catchError((error: HttpErrorResponse) => throwError(error))
		);
	}

	public isAdmin(): boolean {
		const user: User | null = this._currentUser.value;
		return user ? user.isAdmin : false;
	}

	private _setUser(user: User): void {
		this._currentUser.next(user);
	}
}
