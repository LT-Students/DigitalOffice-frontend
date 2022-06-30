import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { CommunicationType } from '@api/user-service/models/communication-type';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { UserService } from '@app/services/user/user.service';
import { CommunicationService } from '@app/services/user/communication.service';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { EmailValue } from '@shared/dialogs/user-recovery/email-item/email-item.component';
import { CommunicationVisibleTo } from '@api/user-service/models/communication-visible-to';

@Injectable()
export class UserRecoveryService {
	private userId!: string;
	public form!: FormArray;
	public isPending = false;
	public emailForRecovery$ = new BehaviorSubject<CommunicationInfo | null>(null);

	constructor(
		private userService: UserService,
		private communicationService: CommunicationService,
		private fb: FormBuilder
	) {}

	public setInitialData(userId: string, emails: CommunicationInfo[], isPending: boolean): void {
		this.userId = userId;
		this.isPending = isPending;
		this.form = this.fb.array(
			emails.map((email: CommunicationInfo) => {
				const emailValue = new EmailValue(email.value, email.id);
				return this.fb.control(emailValue);
			})
		);
	}

	public recover$(): Observable<OperationResultResponse> {
		const selectedControl = this.form.controls.find((c: AbstractControl) => c.value.checked) as FormControl;
		const recoverEmail = selectedControl.value as EmailValue;

		return (
			recoverEmail?.communicationId
				? of(recoverEmail.communicationId)
				: this.communicationService
						.createCommunication({
							userId: this.userId,
							type: CommunicationType.Email,
							value: recoverEmail.email,
						})
						.pipe(
							map((res: OperationResultResponse) => res.body as string),
							catchError((err: HttpErrorResponse) => {
								if (err.error.errors?.some((e: string) => e === 'Communication value already exist.')) {
									selectedControl.setErrors({ emailExists: recoverEmail.email });
								}
								return throwError(err);
							})
						)
		).pipe(
			switchMap((communicationId: string) =>
				this.recoverCallback.call(this.userService, this.userId, communicationId).pipe(
					tap(() => {
						const invitedCommunication: CommunicationInfo = {
							id: communicationId,
							type: CommunicationType.Email,
							value: recoverEmail.email,
							visibleTo: CommunicationVisibleTo.AllUsers,
							isConfirmed: false,
						};
						this.emailForRecovery$.next(invitedCommunication);
					})
				)
			)
		);
	}

	private get recoverCallback(): (userId: string, communicationId: string) => Observable<OperationResultResponse> {
		return this.isPending ? this.userService.resendInvitation : this.userService.restoreUser;
	}
}
