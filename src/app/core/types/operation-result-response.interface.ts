export interface OperationResultResponse<T = any> {
	body?: T;
	errors: string[];
	totalCount?: number;
}
