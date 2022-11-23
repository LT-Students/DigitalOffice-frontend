import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PortalInfo } from '@app/services/admin/admin.service';
import { PortalInfoService } from '@app/services/portal-info.service';

@Component({
	selector: 'do-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
	public portalName$: Observable<string>;
	constructor(private portalService: PortalInfoService) {
		this.portalName$ = this.portalService.portal$.pipe(map((portal: PortalInfo) => portal.portalName));
	}
}
