import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { UserService } from '@app/services/user/user.service';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { filter, first, map, pairwise, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CurrentUserService } from '@app/services/current-user.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { UUID } from '@app/types/uuid.type';
import { ImageUserService } from '@app/services/image/image-user.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ImageInfo } from '@app/models/image.model';

@Injectable({
	providedIn: 'root',
})
export class EmployeePageService implements Resolve<User> {
	private selectedUser: ReplaySubject<User> = new ReplaySubject<User>(1);
	public readonly selectedUser$: Observable<User> = this.selectedUser.asObservable();

	private updateImage$ = new Subject<string>();

	constructor(
		private userService: UserService,
		private currentUserService: CurrentUserService,
		private imageService: ImageUserService
	) {
		this.updateImage$
			.pipe(
				startWith(''),
				pairwise(),
				filter(([oldId, newId]: [string, string]) => oldId !== newId),
				switchMap(([_, newId]: [string, string]) => this.imageService.getImageUser(newId)),
				map((res: OperationResultResponse<ImageInfo>) => res.body as ImageInfo)
			)
			.subscribe({
				next: (image: ImageInfo) => this.updateUserImage(image),
			});
	}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
		return this.getEmployee(route.params.id);
	}

	public getEmployee(userId: UUID): Observable<User> {
		const params: IGetUserRequest = {
			userId: userId,
			includedepartment: true,
			includeposition: true,
			includeoffice: true,
			includecommunications: true,
			includerole: true,
			includeuserimages: true,
			includeprojects: true,
			includecurrentavatar: true,
		};

		return this.userService.getUser(params).pipe(
			withLatestFrom(this.currentUserService.user$),
			tap(([selectedUser, currentUser]) => {
				this.selectedUser.next(selectedUser);
				if (currentUser.id === userId) {
					this.currentUserService.setUser(selectedUser);
				}
			}),
			map(([user, _]) => user),
			tap((user: User) => {
				const avatarId = user.avatar?.parentId;
				if (avatarId) {
					this.getOriginalImage(avatarId);
				}
			})
		);
	}

	public getOriginalImage(imageId: string): void {
		this.updateImage$.next(imageId);
	}

	public refreshSelectedUser(): Observable<User> {
		return this.selectedUser$.pipe(
			first(),
			switchMap((user: User) => this.getEmployee(user.id))
		);
	}

	private updateUserImage(image: ImageInfo): void {
		this.selectedUser$.pipe(
			first(),
		).subscribe({
			next: (user: User) => {
				const updatedUser: User = {
					...user,
					avatar: image
				};
				this.selectedUser.next(updatedUser);
			}
		});
	}
}
