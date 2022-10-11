import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

	public companyForm: UntypedFormGroup;
	public loading$$: BehaviorSubject<boolean>;
	public company$!: Observable<Company>;
	private _companyInfo!: InitialDataEditRequest<CompanyPath>;

	constructor(
		private _fb: UntypedFormBuilder,
		private _companyService: CompanyService,
		private _currentCompany: CurrentCompanyService,
		private _dialogRef: MatDialogRef<EditCompanyComponent>
	) {
		this.companyForm = this._fb.group({
			[CompanyPath.COMPANY_NAME]: [null, Validators.required],
		});

		this.loading$$ = new BehaviorSubject<boolean>(false);
	}

	public ngOnInit(): void {
		//TODO add company id
		this.company$ = this._companyService.getCompany().pipe(
			tap((company) => {
				this._companyInfo = {
					[CompanyPath.COMPANY_NAME]: company.name,
				};
				this.companyForm.patchValue(this._companyInfo);
			})
		);
	}

	public onSubmit(): void {
		this.loading$$.next(true);
		const editRequest = createEditRequest(this.companyForm.getRawValue(), this._companyInfo);
		//TODO add company ID
		this._companyService
			.editCompany('id', editRequest)
			.pipe(
				tap(() => this._dialogRef.close()),
				switchMap(() => this._companyService.getCompany()),
				tap((company) => this._currentCompany.setCompany(company)),
				finalize(() => this.loading$$.next(false))
			)
			.subscribe();
	}
}
