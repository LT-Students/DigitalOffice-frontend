import { Injectable } from '@angular/core';
import { AdminApiService } from '@api/admin-service/services/admin-api.service';
import { GraphicalUserInterfaceApiService } from '@api/admin-service/services/graphical-user-interface-api.service';
import { ServiceEndpointApiService } from '@api/admin-service/services/service-endpoint-api.service';
import { InstallAppRequest } from '@api/admin-service/models/install-app-request';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ServiceConfigurationInfo } from '@api/admin-service/models/service-configuration-info';
import { Observable } from 'rxjs';

export interface PortalInfo {
	id: string;
	portalName: string;
	logoContent?: string;
	logoExtension?: string;
	siteUrl?: string;
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

	public editApp(params: InstallAppRequest): Observable<OperationResultResponse<{} | null>> {
		return this.adminApiService.editAdmin({ body: params });
	}

	public isPortalExists(): Observable<OperationResultResponse<Partial<PortalInfo> | null>> {
		return this.guiApiService.getGraphicalUserInterface();
	}
}
