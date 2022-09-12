import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { forkJoin, of, Subject } from 'rxjs';
import { finalize, first, switchMap, takeUntil } from 'rxjs/operators';
import { WarningOnDialogClose } from '@app/utils/warning-on-dialog-close';
import { DoValidators } from '@app/validators/do-validators';
import { DialogService } from '@app/services/dialog.service';
import { LoadingState } from '@app/utils/loading-state';
import { FeedbackType } from '../models/feedback-type';
import { FeedbackService } from '../services/feedback.service';
import { UploadImagesComponent } from './upload-images/upload-images.component';

@Component({
	selector: 'do-feedback-form',
	templateUrl: './feedback-form.component.html',
	styleUrls: ['./feedback-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFormComponent extends LoadingState implements OnInit {
	@ViewChild(UploadImagesComponent) uploadImages!: UploadImagesComponent;

	public readonly feedbackTypes = FeedbackType.getAllFeedbackTypeInfos();
	public form = this.fb.group({
		category: [this.feedbackTypes[0].type, [DoValidators.required]],
		comment: ['', [DoValidators.required]],
	});

	public readonly destroy$ = new Subject();

	private warningOnClose = new WarningOnDialogClose(this.dialogRef, this.dialog);

	constructor(
		private fb: FormBuilder,
		private feedbackService: FeedbackService,
		private dialog: DialogService,
		private dialogRef: MatDialogRef<FeedbackFormComponent>
	) {
		super();
	}

	public ngOnInit(): void {
		this.warningOnClose.closeEvents$.pipe(takeUntil(this.destroy$)).subscribe({
			next: () => this.beforeClose(),
		});
	}

	public submitReport(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}
		this.setLoading(true);
		const { category, comment } = this.form.getRawValue();
		const imagesAction = this.uploadImages.compressedImages.length
			? forkJoin(this.uploadImages.compressedImages.map((img) => img.loadedImage.pipe(first())))
			: of([]);
		imagesAction
			.pipe(
				switchMap((images) => this.feedbackService.createFeedback(category, comment, images)),
				finalize(() => this.setLoading(false))
			)
			.subscribe({
				next: () => {
					this.close(true);
					this.dialog.info({
						title: 'Комментарий отправлен',
						message: 'Спасибо! Это поможет сервису стать удобнее и лучше для пользователей',
						buttonText: 'Класс!',
					});
				},
			});
	}

	private isFormDirty(): boolean {
		const { comment } = this.form.getRawValue();
		return comment.length || this.uploadImages.compressedImages.length;
	}

	private close(isFeedbackCreated = false): void {
		this.dialogRef.close(isFeedbackCreated);
	}

	public beforeClose(): void {
		this.warningOnClose.beforeClose(this.isFormDirty());
	}
}
