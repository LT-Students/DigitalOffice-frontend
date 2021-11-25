import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyPath, InitialDataEditRequest } from '@app/types/edit-request';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentCompanyService } from '@app/services/current-company.service';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { createEditRequest } from '@app/utils/utils';
import { CompanyService } from '@app/services/company/company.service';
import { Company } from '@app/models/company';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'do-edit-company',
	templateUrl: './edit-company.component.html',
	styleUrls: ['./edit-company.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCompanyComponent implements OnInit {
	public EditPath = CompanyPath;

	public companyForm: FormGroup;
	public loading$$: BehaviorSubject<boolean>;
	public company$!: Observable<Company>;
	private _companyInfo!: InitialDataEditRequest<CompanyPath>;

	constructor(
		private _fb: FormBuilder,
		private _companyService: CompanyService,
		private _currentCompany: CurrentCompanyService,
		private _dialogRef: MatDialogRef<EditCompanyComponent>
	) {
		this.companyForm = this._fb.group({
			[CompanyPath.COMPANY_NAME]: [null, Validators.required],
			[CompanyPath.PORTAL_NAME]: [null, Validators.required],
			[CompanyPath.SITE_URL]: [null, Validators.required],
			[CompanyPath.HOST]: [null, Validators.required],
			[CompanyPath.PORT]: [null, Validators.required],
			[CompanyPath.EMAIL]: [null, Validators.required],
			[CompanyPath.ENABLE_SSL]: [null],
		});

		this.loading$$ = new BehaviorSubject<boolean>(false);
	}

	public ngOnInit(): void {
		this.company$ = this._companyService.getCompany({ includesmtpcredentials: true }).pipe(
			tap((company) => {
				this._companyInfo = {
					[CompanyPath.COMPANY_NAME]: company.companyName,
					[CompanyPath.PORTAL_NAME]: company.portalName,
					[CompanyPath.COMPANY_NAME]: company.companyName,
					[CompanyPath.SITE_URL]: company.siteUrl,
					[CompanyPath.HOST]: company.smtpInfo?.host,
					[CompanyPath.PORT]: company.smtpInfo?.port,
					[CompanyPath.EMAIL]: company.smtpInfo?.email,
					[CompanyPath.ENABLE_SSL]: company.smtpInfo?.enableSsl,
				};
				this.companyForm.patchValue(this._companyInfo);
			})
		);
	}

	public onSubmit(): void {
		this.loading$$.next(true);
		const editRequest = createEditRequest(this.companyForm.getRawValue(), this._companyInfo);
		this._companyService
			.editCompany(editRequest)
			.pipe(
				tap(() => this._dialogRef.close()),
				switchMap(() => this._companyService.getCompany()),
				tap((company) => this._currentCompany.setCompany(company)),
				finalize(() => this.loading$$.next(false))
			)
			.subscribe();
	}
}
