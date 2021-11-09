import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { OfficeInfo } from '@data/api/company-service/models/office-info';
import { OfficeService } from '@app/services/company/office.service';

@Injectable({
	providedIn: 'root',
})
export class OfficeResolver implements Resolve<OperationResultResponse<OfficeInfo[]>> {
	constructor(private _officeService: OfficeService) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<OfficeInfo[]>> {
		return this._officeService.findOffices({ skipCount: 0, takeCount: 10 });
	}
}
