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
import { Moment } from 'moment';
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

	public editUser(
		userId: string,
		changes: { path: string; value: any }[]
	): Observable<OperationResultResponse<null | {}>> {
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

	public disableUser(userId: string): Observable<OperationResultResponse<null | {}>> {
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

	public activateUser(userId: string): Observable<OperationResultResponse<null | {}>> {
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
}
