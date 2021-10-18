import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { CreateUserRequest } from '@data/api/user-service/models/create-user-request';
import {
	CertificateInfo,
	CommunicationInfo,
	EducationInfo,
	OperationResultStatusType,
	PatchUserDocument,
	ProjectInfo,
	UserAchievementInfo,
	UserInfo,
} from '@data/api/user-service/models';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { User } from '@app/models/user/user.model';
import { IEditUserRequest } from '@app/types/edit-user-request.interface';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';

export interface IUserResponse {
	user?: UserInfo;
	skills?: Array<string>;
	communications?: Array<CommunicationInfo>;
	certificates?: Array<CertificateInfo>;
	achievements?: Array<UserAchievementInfo>;
	projects?: Array<ProjectInfo>;
	educations?: Array<EducationInfo>;
}

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private _userApiService: UserApiService) {}

	public getUser(params: IGetUserRequest): Observable<User> {
		return this._userApiService
			.getUser(params)
			.pipe(switchMap((userResponse: OperationResultResponse<IUserResponse>) => of(new User(userResponse))));
	}

	public findUsers(
		skipPages = 0,
		pageSize = 10,
		departmentId?: string
	): Observable<OperationResultResponse<UserInfo[]>> {
		return this._userApiService.findUsers({
			skipCount: skipPages,
			takeCount: pageSize,
			departmentid: departmentId,
		});
	}

	public createUser(params: CreateUserRequest): Observable<OperationResultResponse<null | {}>> {
		return this._userApiService.createUser({ body: params }).pipe(
			switchMap((res) => {
				return res.status === OperationResultStatusType.Failed ? throwError(res) : of(res);
			}),
			catchError((error) => throwError(error))
		);
	}

	public editUser(userId: string, body: PatchUserDocument[]): Observable<OperationResultResponse<null | {}>> {
		const params: IEditUserRequest = { userId, body };

		return this._userApiService.editUser(params);
	}

	public disableUser(userId: string | undefined): Observable<OperationResultResponse<null | {}>> {
		const params: IEditUserRequest = {
			userId: userId ?? '',
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

	public activateUser(userId: string | undefined): Observable<OperationResultResponse<null | {}>> {
		const params: IEditUserRequest = {
			userId: userId ?? '',
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
}
