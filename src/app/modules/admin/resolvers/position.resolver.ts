import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { PositionService } from '@app/services/position/position.service';
import { PositionInfo } from '@api/position-service/models';

@Injectable({
	providedIn: 'root',
})
export class PositionResolver implements Resolve<FindResponse<PositionInfo>> {
	constructor(private _positionService: PositionService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FindResponse<PositionInfo>> {
		return this._positionService.findPositions({ skipCount: 0, takeCount: 10, includeDeactivated: false });
	}
}
