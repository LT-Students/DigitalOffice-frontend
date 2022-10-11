import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, UntypedFormArray } from '@angular/forms';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { UserRecoveryService } from '@shared/dialogs/user-recovery/user-recovery.service';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

export interface UserRecoveryData {
	userId: string;
	isPending: boolean;
	emails: CommunicationInfo[];
}

@Component({
	selector: 'do-user-recovery',
	templateUrl: './user-recovery.component.html',
	styleUrls: ['./user-recovery.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [UserRecoveryService],
})
export class UserRecoveryComponent implements OnInit {
	public isLoading$ = new Subject<boolean>();
	public emailForRecovery$ = this.userRecovery.emailForRecovery$;

	public isFormValid = false;
	public title = '';
	public form!: UntypedFormArray;

	constructor(@Inject(MAT_DIALOG_DATA) data: UserRecoveryData, private userRecovery: UserRecoveryService) {
		this.userRecovery.setInitialData(data.userId, data.emails, data.isPending);
	}

	public ngOnInit(): void {
		this.form = this.userRecovery.form;
		this.title = this.userRecovery.isPending ? 'Активация сотрудника' : 'Восстановление сотрудника';
	}

	public handleChange(index: number): void {
		this.form.controls.forEach((control: AbstractControl, i: number) => {
			if (i !== index) {
				const newValue = { ...control.value, checked: false };
				control.setValue(newValue);
			}
		});
		this.isFormValid = this.form.controls.filter((c: AbstractControl) => c.value.checked).length === 1;
	}

	public onSubmit(): void {
		this.isLoading$.next(true);
		this.userRecovery
			.recover$()
			.pipe(finalize(() => this.isLoading$.next(false)))
			.subscribe();
	}
}
