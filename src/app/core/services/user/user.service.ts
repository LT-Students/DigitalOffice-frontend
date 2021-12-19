import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { CreateUserRequest } from '@data/api/user-service/models/create-user-request';
import {
	CertificateInfo,
	CommunicationInfo,
	EducationInfo,
	ProjectInfo,
	UserAchievementInfo,
	UserInfo,
} from '@data/api/user-service/models';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { User } from '@app/models/user/user.model';
import { IEditUserRequest } from '@app/types/edit-user-request.interface';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { AvatarApiService } from '@data/api/user-service/services/avatar-api.service';
import { UUID } from '@app/types/uuid.type';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { IImageInfo } from '@app/models/image.model';
import { EditRequest, UserPath } from '@app/types/edit-request';

export interface IUserResponse {
	user?: UserInfo;
	skills?: Array<string>;
	communications?: Array<CommunicationInfo>;
	certificates?: Array<CertificateInfo>;
	achievements?: Array<UserAchievementInfo>;
	projects?: Array<ProjectInfo>;
	educations?: Array<EducationInfo>;
}

export interface IFindUsers {
	skipCount: number;
	takeCount: number;
	departmentid?: string;
	includedeactivated?: boolean;
	includedepartment?: boolean;
	includeposition?: boolean;
	includeoffice?: boolean;
	includerole?: boolean;
	includeavatar?: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(
		private _userApiService: UserApiService,
		private _imageApiService: AvatarApiService,
		private _responseMessage: ResponseMessageModel
	) {}

	public getUser(params: IGetUserRequest): Observable<User> {
		return this._userApiService
			.getUser(params)
			.pipe(switchMap((userResponse: OperationResultResponse<IUserResponse>) => of(new User(userResponse))));
	}

	public findUsers(params: IFindUsers): Observable<OperationResultResponse<UserInfo[]>> {
		return this._userApiService.findUsers(params);
	}

	public createUser(params: CreateUserRequest): Observable<OperationResultResponse<null | {}>> {
		return this._userApiService
			.createUser({ body: params })
			.pipe(this._responseMessage.message(MessageTriggeredFrom.User, MessageMethod.Create));
	}

	public editUser(
		userId: string,
		editRequest: EditRequest<UserPath>
	): Observable<OperationResultResponse<null | {}>> {
		const params: IEditUserRequest = { userId: userId, body: editRequest };

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

	public createAvatarImage(image: IImageInfo, userId: UUID): Observable<OperationResultResponse<null | {}>> {
		return this._imageApiService.createAvatar({
			body: {
				content: image.content,
				userId,
				extension: image.extension,
				name: image.name,
				isCurrentAvatar: true,
			},
		});
	}

	public changeAvatar(imageId: UUID, userId: UUID): Observable<OperationResultResponse<null | {}>> {
		return this._imageApiService.editAvatar({ userId: userId, imageId: imageId });
	}
}
