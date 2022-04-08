export interface OperationResultResponse<T = {} | null> {
	body?: T;
	errors?: string[];
	status?: OperationResultStatusType;
	totalCount?: number;
}

export enum OperationResultStatusType {
	FullSuccess = 'FullSuccess',
	PartialSuccess = 'PartialSuccess',
	Failed = 'Failed',
}
