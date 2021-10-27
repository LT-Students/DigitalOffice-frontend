import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CurrentCompanyService } from '@app/services/current-company.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'do-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
	public portalName: Observable<string>;
	constructor(private _currentCompanyService: CurrentCompanyService) {
		this.portalName = this._currentCompanyService.company$.pipe(map((company) => company.portalName));
	}
}
