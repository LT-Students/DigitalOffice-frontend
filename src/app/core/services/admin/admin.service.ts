import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminApiService, ServiceEndpointApiService } from '@api/admin-service/services';
import { InstallAppRequest, ServiceConfigurationInfo } from '@api/admin-service/models';
import { GraphicalUserInterfaceApiService } from '@api/gateway-service/services/graphical-user-interface-api.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ImageConsist } from '@api/gateway-service/models/image-consist';

export interface PortalInfo {
	id: string;
	portalName: string;
	createdAtUtc: string;
	siteUrl?: string;
	favicon?: ImageConsist;
	logo?: ImageConsist;
}

@Injectable({
	providedIn: 'root',
})
export class AdminService {
	constructor(
		private adminApiService: AdminApiService,
		private guiApiService: GraphicalUserInterfaceApiService,
		private serviceEndpointApiService: ServiceEndpointApiService
	) {}

	public installApp(
		params: InstallAppRequest
	): Observable<OperationResultResponse<Array<ServiceConfigurationInfo> | null>> {
		return this.adminApiService.installApp({ body: params });
	}

	public editApp(params: InstallAppRequest): Observable<OperationResultResponse> {
		return this.adminApiService.editAdmin({ body: params });
	}

	public isPortalExists(): Observable<OperationResultResponse<PortalInfo | null>> {
		return this.guiApiService.getGraphicalUserInterface();
	}
}
