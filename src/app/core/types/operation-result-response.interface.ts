export interface OperationResultResponse<T = any> {
	body?: T;
	errors: string[];
	totalCount?: number;
}

export class FindResponse<T> {
	public data: T[];
	public totalCount = 0;

	constructor(response?: OperationResultResponse<T[]>) {
		this.data = response?.body || [];
		this.totalCount = response?.totalCount || 0;
	}
}
