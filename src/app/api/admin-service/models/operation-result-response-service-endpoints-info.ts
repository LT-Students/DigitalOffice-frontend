/* tslint:disable */
/* eslint-disable */
import { EndpointInfo } from './endpoint-info';
import { OperationResultStatusType } from './operation-result-status-type';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseServiceEndpointsInfo {
	body?: { serviceId?: string; serviceName?: string; endpoints?: Array<EndpointInfo> };
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
