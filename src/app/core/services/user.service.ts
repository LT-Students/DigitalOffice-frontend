import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { UserInfo } from '@data/api/user-service/models/user-info';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { CreateUserRequest } from '@data/api/user-service/models/create-user-request';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { UsersResponse } from '@data/api/user-service/models/users-response';
import { LocalStorageService } from '@app/services/local-storage.service';
import { EditUserRequest, OperationResultStatusType, PatchUserDocument } from '@data/api/user-service/models';
import { HttpErrorResponse } from '@angular/common/http';
import { userResponse } from '../../modules/employee/mock';
import { Moment } from 'moment';

@Injectable()
export class UserService {
	public selectedUser: BehaviorSubject<UserResponse>;

	constructor(private userApiService: UserApiService, private route: ActivatedRoute, private localStorageService: LocalStorageService) {
		this.selectedUser = new BehaviorSubject<UserResponse>(null);
	}

	public getUser(userId: string, includeAll = false): Observable<UserResponse> {
		if (includeAll) {
			return this.userApiService.getUser({
				userId: userId,
				includedepartment: true,
				// includeposition: true,
				includecommunications: true,
			});
		}
		return this.userApiService.getUser({ userId: userId });
	}

	public getUserSetCredentials(userId: string): Observable<UserResponse> {
		return this.getUser(userId).pipe(tap(this._setUser.bind(this)));
	}

	public getUsers(): Observable<UserInfo[]> {
		return (
			this.userApiService
				/* TODO: Подумать, как получать конкретные данные о каждом юзере
				 *   при получении данных о всех юзера
				 * */
				.findUsers({ skipCount: 0, takeCount: 10 })
				.pipe(switchMap((usersResponse: UsersResponse) => of(usersResponse.users)))
		);
	}

	public getMockUser(userId: string): Observable<UserResponse> {
		const userData: UserResponse = userResponse.find((user: UserResponse) => user.user.id === userId);
		return of(userData).pipe(tap((value: UserResponse) => console.log(value)));
	}

	public isAdmin(): boolean {
		const user: UserInfo = this.localStorageService.get('user');
		return user ? user.isAdmin : false;
	}

	public getCurrentUser(): UserInfo | null {
		const user: UserInfo = this.localStorageService.get('user');
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

	private _setUser(user: UserResponse): void {
		this.localStorageService.set('user', user.user);
		this.selectedUser.next(user);
	}

	public editUser(userId: string, changes: any): Observable<OperationResultResponse> {
		const editRequest: Array<PatchUserDocument> = [];
		changes.forEach((item) => {
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
				default:
					break;
			}
		});

		return this.userApiService.editUser({ userId, body: editRequest });
	}
}
