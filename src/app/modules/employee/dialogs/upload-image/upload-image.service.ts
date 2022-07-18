import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { BaseImageInfo } from '@app/models/image.model';
import { UserService } from '@app/services/user/user.service';
import { EmployeePageService } from '../../services/employee-page.service';

@Injectable()
export class UploadImageService {
	private image = new BehaviorSubject<BaseImageInfo | null>(null);
	public image$ = this.image.asObservable();

	constructor(private employeePageService: EmployeePageService, private userService: UserService) {}

	public setUploadImage(image: BaseImageInfo | null): void {
		this.image.next(image);
	}

	public saveImage(image: BaseImageInfo): Observable<any> {
		return this.employeePageService.selectedUser$.pipe(
			first(),
			map((user: User) => user.id),
			switchMap((userId: string) => this.userService.createAvatarImage(image, userId)),
			switchMap(() => this.employeePageService.refreshSelectedUser())
		);
	}
}
