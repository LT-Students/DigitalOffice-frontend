import { EditPositionRequest } from '@data/api/company-service/models/edit-position-request';

export interface IEditPositionRequest {
	/**
	 * Specific position id
	 */
	positionId: string;
	body?: EditPositionRequest;
}
