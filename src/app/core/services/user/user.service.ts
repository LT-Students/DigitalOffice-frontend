import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UserApiService } from '@api/user-service/services/user-api.service';
import { CreateUserRequest } from '@api/user-service/models/create-user-request';
import { EditUserActiveRequest, UserInfo, UserResponse } from '@api/user-service/models';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { User } from '@app/models/user/user.model';
import { IEditUserRequest } from '@app/types/edit-user-request.interface';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { AvatarApiService } from '@api/user-service/services/avatar-api.service';
import { UUID } from '@app/types/uuid.type';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { ImageInfo } from '@app/models/image.model';
import { EditRequest, UserPath } from '@app/types/edit-request';

export interface IFindUsers {
	skipCount: number;
	takeCount: number;
	departmentid?: string;
	includedeactivated?: boolean;
	includedepartment?: boolean;
	includeposition?: boolean;
	includeoffice?: boolean;
	includerole?: boolean;
	includecurrentavatar?: boolean;
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
			.pipe(
				switchMap((userResponse: OperationResultResponse<UserResponse>) =>
					of(new User(userResponse.body as UserResponse))
				)
			);
	}

	public findUsers(params: IFindUsers): Observable<OperationResultResponse<UserInfo[]>> {
		return this._userApiService.findUsers(params);
	}

	public createUser(params: CreateUserRequest): Observable<OperationResultResponse> {
		return this._userApiService
			.createUser({ body: params })
			.pipe(this._responseMessage.message(MessageTriggeredFrom.User, MessageMethod.Create));
	}

	public editUser(userId: string, editRequest: EditRequest<UserPath>): Observable<OperationResultResponse> {
		const params: IEditUserRequest = { userId: userId, body: editRequest };

		return this._userApiService.editUser(params);
	}

	public disableUser(userId: string): Observable<OperationResultResponse> {
		const params: EditUserActiveRequest = {
			userId: userId,
			isActive: false,
		};
		return this._userApiService.editUserActive({ body: params });
	}

	public restoreUser(userId: string, communicationId: string): Observable<OperationResultResponse> {
		const params: EditUserActiveRequest = {
			userId: userId,
			communicationId: communicationId,
			isActive: true,
		};
		return this._userApiService.editUserActive({ body: params });
	}

	public createAvatarImage(image: ImageInfo, userId: UUID): Observable<OperationResultResponse> {
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

	public changeAvatar(imageId: UUID, userId: UUID): Observable<OperationResultResponse> {
		return this._imageApiService.editAvatar({ userId: userId, imageId: imageId });
	}
}
