import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DoValidators } from '@app/validators/do-validators';
import { MatDialogRef } from '@angular/material/dialog';
import { forkJoin, merge, Observable, of, Subject } from 'rxjs';
import { filter, finalize, first, switchMap } from 'rxjs/operators';
import { DialogService } from '@app/services/dialog.service';
import { LoadingState } from '@shared/directives/button-loading.directive';
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

	private get closeEvents$(): Observable<MouseEvent | KeyboardEvent> {
		return merge(
			this.dialogRef.backdropClick(),
			this.dialogRef.keydownEvents().pipe(filter((e: KeyboardEvent) => e.key === 'Escape'))
		);
	}

	constructor(
		private fb: FormBuilder,
		private feedbackService: FeedbackService,
		private dialog: DialogService,
		private dialogRef: MatDialogRef<FeedbackFormComponent>
	) {
		super();
	}

	public ngOnInit(): void {
		this.closeEvents$.subscribe({
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
					this.close();
					this.dialog.info({
						title: 'Комментарий отправлен',
						message: 'Спасибо! Это поможет сервису стать удобнее и лучше\n' + 'для пользователей',
						buttonText: 'Класс!',
					});
				},
			});
	}

	private isFormDirty(): boolean {
		const { comment } = this.form.getRawValue();
		return comment.length || this.uploadImages.compressedImages.length;
	}

	private close(): void {
		this.dialogRef.close();
	}

	public beforeClose(): void {
		if (this.isFormDirty()) {
			this.dialog
				.confirm({
					title: 'Вы уверены?',
					message: 'Закрыть окно? Ваши данные не сохранятся',
					confirmText: 'Да, закрыть',
				})
				.afterClosed()
				.subscribe({
					next: (confirm?: boolean) => (confirm ? this.close() : null),
				});
		} else {
			this.close();
		}
	}
}
