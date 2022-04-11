import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { PositionService } from '@app/services/position/position.service';
import { PositionInfo } from '@api/position-service/models/position-info';

@Injectable({
	providedIn: 'root',
})
export class PositionResolver implements Resolve<OperationResultResponse<PositionInfo[]>> {
	constructor(private _positionService: PositionService) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<PositionInfo[]>> {
		return this._positionService.findPositions({ skipcount: 0, takecount: 10 });
	}
}
