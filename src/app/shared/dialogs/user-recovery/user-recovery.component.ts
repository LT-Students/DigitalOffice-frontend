import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { AbstractControl, UntypedFormArray } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { LoadingState } from '@app/utils/loading-state';
import { UserRecoveryService } from '@shared/dialogs/user-recovery/user-recovery.service';

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
	public loadingState = new LoadingState();
	public emailForRecovery$ = this.userRecovery.emailForRecovery$;

	public isFormValid = false;
	public title = '';
	public form!: UntypedFormArray;

	constructor(@Inject(DIALOG_DATA) data: UserRecoveryData, private userRecovery: UserRecoveryService) {
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
		this.loadingState.setLoading(true);
		this.userRecovery
			.recover$()
			.pipe(finalize(() => this.loadingState.setLoading(false)))
			.subscribe();
	}
}
