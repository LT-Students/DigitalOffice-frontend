import { Injectable } from '@angular/core';
import { PortalInfo } from '@app/services/admin/admin.service';
import { Observable, ReplaySubject } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root',
})
export class PortalService {
	private portal: ReplaySubject<PortalInfo>;
	public readonly portal$: Observable<PortalInfo>;

	private isPortalExists: ReplaySubject<boolean>;
	public readonly isPortalExists$: Observable<boolean>;

	constructor(private title: Title) {
		this.portal = new ReplaySubject<PortalInfo>(1);
		this.portal$ = this.portal.asObservable();

		this.isPortalExists = new ReplaySubject<boolean>(1);
		this.isPortalExists$ = this.isPortalExists.asObservable();
	}

	public setPortal(portalInfo: PortalInfo | null): void {
		if (portalInfo) {
			this.portal.next(portalInfo);
			this.title.setTitle(portalInfo.portalName);
		}
		this.isPortalExists.next(!!portalInfo);
	}
}
