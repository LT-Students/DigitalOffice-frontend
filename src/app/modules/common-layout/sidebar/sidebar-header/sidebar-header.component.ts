import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { PortalInfo } from '@app/services/admin/admin.service';
import { AppRoutes } from '@app/models/app-routes';
import { CurrentUserService } from '@app/services/current-user.service';
import { PortalInfoService } from '@app/services/portal-info.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
	selector: 'do-sidebar-header',
	templateUrl: './sidebar-header.component.html',
	styleUrls: ['./sidebar-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarHeaderComponent {
	@Input()
	set isWideScreen(value: any) {
		this._isWideScreen = coerceBooleanProperty(value);
	}
	public _isWideScreen = false;

	public AppRoutes = AppRoutes;
	public user$ = this.currentUser.user$;
	public portalName$ = this.portalService.portal$.pipe(map((portal: PortalInfo) => portal.portalName));

	constructor(private currentUser: CurrentUserService, private portalService: PortalInfoService) {}
}
