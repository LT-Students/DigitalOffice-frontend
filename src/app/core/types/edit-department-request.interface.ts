//@ts-nocheck
import { EditDepartmentRequest } from '@data/api/company-service/models/edit-department-request';

export interface IEditDepartmentRequest {
	/**
	 * Specific position id
	 */
	departmentId: string;
	body?: EditDepartmentRequest
}
