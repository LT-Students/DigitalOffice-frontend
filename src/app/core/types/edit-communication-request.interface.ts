import { EditCommunicationRequest } from '@api/user-service/models/edit-communication-request';

export interface IEditCommunicationRequest {
	/**
	 * Specific communication id
	 */
	communicationId: string;
	body?: EditCommunicationRequest;
}
