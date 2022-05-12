import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IImageInfo, UploadedImage } from '@app/models/image.model';
import { Observable, Subject } from 'rxjs';
import { UserService } from '@app/services/user/user.service';
import { finalize, first, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeePageService } from '../../services/employee-page.service';

@Component({
	selector: 'do-upload-photo',
	templateUrl: './upload-photo.component.html',
	styleUrls: ['./upload-photo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadPhotoComponent {
	public isImageUploaded = false;
	public image$?: Observable<IImageInfo>;
	public loading$ = new Subject<boolean>();

	constructor(
		private employeePageService: EmployeePageService,
		private userService: UserService,
		private dialogRef: MatDialogRef<UploadPhotoComponent>
	) {}

	public onFileDropped(event: FileList): void {
		this.handleFile(event[0]);
	}

	public onFileChanged(event: Event): void {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			this.handleFile(file);
		}
	}

	private handleFile(file: File): void {
		const image = new UploadedImage(file);
		this.image$ = image.getCreateImageRequest();
		this.isImageUploaded = true;
	}

	public saveImage(): void {
		this.loading$.next(true);
		this.image$
			?.pipe(
				first(),
				withLatestFrom(this.employeePageService.selectedUser$.pipe(map((user: User) => user.id))),
				switchMap(([file, userId]: [IImageInfo, string]) => this.userService.createAvatarImage(file, userId)),
				switchMap(() => this.employeePageService.refreshSelectedUser()),
				finalize(() => this.loading$.next(false))
			)
			.subscribe({
				next: () => {
					this.dialogRef.close();
				},
			});
	}
}
