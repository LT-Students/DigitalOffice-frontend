import { Injectable } from '@angular/core';
import { AvatarApiService } from '@api/user-service/services/avatar-api.service';

@Injectable({
	providedIn: 'root',
})
export class ImageMessageService {
	constructor(private _imageAvatarService: AvatarApiService) {}
}
