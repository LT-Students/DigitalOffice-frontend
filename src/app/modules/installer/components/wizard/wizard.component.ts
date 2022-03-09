import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AdminService } from '@app/services/admin/admin.service';

@Component({
	selector: 'do-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardComponent implements OnInit {
	public companyForm: FormGroup;
	public adminForm: FormGroup;
	public smtpForm: FormGroup;

	public loading$$: BehaviorSubject<boolean>;

	constructor(
		private _formBuilder: FormBuilder,
		private adminService: AdminService,
		private _router: Router,
		private _titleService: Title
	) {
		this.loading$$ = new BehaviorSubject<boolean>(false);
		this._titleService.setTitle('Installer');
		this.companyForm = this._formBuilder.group({
			portalName: ['', Validators.required],
			siteUrl: ['', Validators.required],
		});
		this.adminForm = this._formBuilder.group(
			{
				firstName: ['', Validators.required],
				lastName: ['', Validators.required],
				middleName: [''],
				email: ['', Validators.required],
				login: ['', Validators.required],
				password: ['', Validators.required],
				confirmPassword: ['', Validators.required],
			},
			{ validators: this.matchControls('password', 'confirmPassword') }
		);
		this.smtpForm = this._formBuilder.group(
			{
				host: ['', Validators.required],
				port: ['', Validators.required],
				enableSsl: ['', Validators.required],
				email: ['', Validators.required],
				password: ['', Validators.required],
				confirmPassword: ['', Validators.required],
			},
			{ validators: this.matchControls('password', 'confirmPassword') }
		);
	}

	ngOnInit() {}

	public matchControls(
		field1: string | (string | number)[],
		field2: string | (string | number)[]
	): ValidatorFn | null {
		return (group: AbstractControl): ValidationErrors | null => {
			const control1 = group.get(field1);
			const control2 = group.get(field2);
			return control1 && control2 && control1.value && control2.value && control1.value !== control2.value
				? { matchingPasswords: 'Пароль не совпадает' }
				: null;
		};
	}

	public submitForm(): void {
		this.loading$$.next(true);
		this.adminService
			.installApp({
				guiInfo: {
					PortalName: this.companyForm.get('portalName')?.value,
					SiteUrl: this.companyForm.get('siteUrl')?.value,
				},
				adminInfo: {
					FirstName: this.adminForm.get('firstName')?.value,
					LastName: this.adminForm.get('lastName')?.value,
					MiddleName: this.adminForm.get('middleName')?.value,
					Email: this.adminForm.get('email')?.value,
					Login: this.adminForm.get('login')?.value,
					Password: this.adminForm.get('password')?.value,
				},
				smtpInfo: {
					Host: this.smtpForm.get('host')?.value,
					Port: this.smtpForm.get('port')?.value,
					Email: this.smtpForm.get('email')?.value,
					Password: this.smtpForm.get('password')?.value,
					EnableSsl: this.smtpForm.get('enableSsl')?.value,
				},
				servicesToDisable: [],
			})
			.pipe(finalize(() => this.loading$$.next(false)))
			.subscribe(() => {
				this._router.navigate(['/auth/login']);
			});
	}
}
