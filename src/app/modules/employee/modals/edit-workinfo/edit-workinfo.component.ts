import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { IUserStatus, UserStatusModel } from '@app/models/user/user-status.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateType } from '@app/types/date.enum';
import { UserStatus } from '@api/user-service/models/user-status';
import { User } from '@app/models/user/user.model';
import { EmployeePageService } from '../../services/employee-page.service';

@Component({
	selector: 'do-edit-workinfo',
	templateUrl: './edit-workinfo.component.html',
	styleUrls: ['./edit-workinfo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditWorkinfoComponent implements OnInit {
	public user: User;
	public EditForm: FormGroup;

	public userDates: any;

	constructor(@Inject(MAT_DIALOG_DATA) data: User, private formBuilder: FormBuilder) {
		this.user = data;
		this.EditForm = this.formBuilder.group({
			department: [this.user.department],
		});
		console.log(this.user);
		this.userDates = [
			{
				name: 'Департамент',
				value: this.user.department?.name,
			},
			{
				name: 'Офис',
				value: this.user.office?.name,
			},
			{
				name: 'Должность',
				value: this.user.position?.name,
			},
			{
				name: 'Роль',
				value: this.user.role?.name,
			},
			{
				name: 'Ставка',
				value: this.user.department?.name,
			},
			{
				name: 'В компании с',
				value: this.user.department?.name,
			},
		];
	}
	ngOnInit(): void {}

	public get department(): FormControl {
		return this.EditForm.get('department')?.value;
	}

	testClick() {
		console.log(`click`);
	}
}
