/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { ServiceConfigurationInfo } from './service-configuration-info';
export interface FindResultResponseServiceConfigurationInfo {
	body?: Array<ServiceConfigurationInfo>;
	errors?: Array<string>;
	status?: OperationResultStatusType;
	totalCount?: number;
}
