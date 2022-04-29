import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Company } from '@app/models/company';
import { CompanyService } from '@app/services/company/company.service';
import { CompanyResponse } from '@api/company-service/models/company-response';

@Injectable({
	providedIn: 'root',
})
export class CurrentCompanyService {
	private _company: ReplaySubject<Company>;
	public readonly company$: Observable<Company>;

	constructor(private _companyService: CompanyService) {
		this._company = new ReplaySubject<Company>(1);
		this.company$ = this._company.asObservable();
	}

	public setCompany(companyInfo: CompanyResponse): void {
		const company = new Company(companyInfo);
		this._company.next(company);
	}
}
