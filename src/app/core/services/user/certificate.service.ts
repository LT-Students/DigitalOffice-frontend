import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CertificateApiService } from '@data/api/education-service/services/certificate-api.service';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { CreateCertificateRequest } from '@data/api/education-service/models/create-certificate-request';
import { EditCertificateRequest } from '@data/api/education-service/models/edit-certificate-request';

export interface IEditCertificateRequest {
	/**
	 * Specific certificate id
	 */
	certificateId: string;
	body?: EditCertificateRequest;
}

export interface IRemoveCertificateRequest {
	/**
	 * Specific certificate id
	 */
	certificateId: string;
}

@Injectable({
	providedIn: 'root',
})
export class CertificateService {
	constructor(private _certificateService: CertificateApiService) {}

	public createCertificate(body: CreateCertificateRequest): Observable<OperationResultResponse> {
		return this._certificateService.createCertificate({ body });
	}

	public editCertificate(params: IEditCertificateRequest): Observable<OperationResultResponse> {
		return this._certificateService.editCertificate(params);
	}

	public removeCertificate(params: IRemoveCertificateRequest): Observable<OperationResultResponse> {
		return this._certificateService.removeCertificate(params);
	}
}
