import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DoValidators } from '@app/validators/do-validators';
import { MatDialogRef } from '@angular/material/dialog';
import { merge, Observable, Subject } from 'rxjs';
import { filter, finalize } from 'rxjs/operators';
import { DialogService } from '@app/services/dialog.service';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { FeedbackType } from '../models/feedback-type';
import { FeedbackService } from '../services/feedback.service';

@Component({
	selector: 'do-feedback-form',
	templateUrl: './feedback-form.component.html',
	styleUrls: ['./feedback-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFormComponent extends LoadingState implements OnInit {
	public readonly feedbackTypes = FeedbackType.getAllFeedbackTypeInfos();
	public form = this.fb.group({
		category: [this.feedbackTypes[0].type, [DoValidators.required]],
		comment: ['', [DoValidators.required]],
		images: [[]],
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
			next: () => {
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
			},
		});
	}

	public submitReport(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}
		this.setLoading(true);
		const { category, comment, images } = this.form.getRawValue();
		this.feedbackService
			.createReport(category, comment, images)
			.pipe(finalize(() => this.setLoading(false)))
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

	public handleImagesChange(images: File[]): void {
		this.form.patchValue({ images });
	}

	private isFormDirty(): boolean {
		const { comment, images } = this.form.getRawValue();
		return comment.length || images.length;
	}

	private close(): void {
		this.dialogRef.close();
	}
}
