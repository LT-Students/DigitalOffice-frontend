import { Injectable } from '@angular/core';
import { UserApiService } from '@api/user-service/services/user-api.service';
import { Observable } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { map } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { UserResponse } from '@api/user-service/models/user-response';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	constructor(private userApiService: UserApiService) {}

	public getUser(userId: string): Observable<User> {
		const params: IGetUserRequest = {
			userId,
			includedepartment: true,
			includeposition: true,
			includeoffice: true,
			includecommunications: true,
			includerole: true,
			includeavatars: true,
			includeprojects: true,
			includecurrentavatar: true,
			includecompany: true,
			locale: 'ru',
		};

		return this.userApiService
			.getUser(params)
			.pipe(map((res: OperationResultResponse<UserResponse>) => new User(res.body as UserResponse)));
	}
}
