//@ts-nocheck
import { OperationResultStatusType } from '@data/api/user-service/models/operation-result-status-type';

export interface OperationResultResponse<T> {
	body?: T;
	errors?: string[];
	status?: OperationResultStatusType;
}
