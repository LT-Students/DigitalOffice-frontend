import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { IPositionInfo, PositionService } from '@app/services/company/position.service';

@Injectable({
	providedIn: 'root',
})
export class PositionResolver implements Resolve<OperationResultResponse<IPositionInfo[]>> {
	constructor(private _positionService: PositionService) {}
	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<IPositionInfo[]>> {
		return this._positionService.findPositions({ skipCount: 0, takeCount: 10 });
	}
}
