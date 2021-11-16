import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { CreateUserRequest } from '@data/api/user-service/models/create-user-request';
import {
	CertificateInfo,
	CommunicationInfo,
	EducationInfo,
	ImageInfo,
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
import { ImageApiService } from '@data/api/user-service/services/image-api.service';
import { UUID } from '@app/types/uuid.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';

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
		private _imageApiService: ImageApiService,
		private _snackBar: MatSnackBar
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
		return this._userApiService.createUser({ body: params }).pipe(
			catchError((err) => {
				this._snackBar.open(ResponseMessageModel.getErrorMessage(err), '×', { duration: 3000 });
				return throwError(err);
			}),
			tap(() => {
				this._snackBar.open(
					ResponseMessageModel.getSuccessMessage(MessageTriggeredFrom.User, MessageMethod.Create),
					'done',
					{
						duration: 3000,
					}
				);
			})
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

	public createAvatarImage(image: ImageInfo, userId: UUID): Observable<OperationResultResponse<null | {}>> {
		//@ts-ignore
		return this._imageApiService.createImage({ body: { ...image, entityType: 'user', entityId: userId } });
	}

	public changeAvatar(imageId: UUID, userId: UUID): Observable<OperationResultResponse<null | {}>> {
		return this._imageApiService.changeAvatar({ userId: userId, imageId: imageId });
	}
}
