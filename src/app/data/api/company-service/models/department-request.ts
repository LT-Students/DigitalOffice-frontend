/* tslint:disable */
/* eslint-disable */
export interface DepartmentRequest {
  /**
   * Company global unique identifier.
   */
  companyId: string;

  /**
   * Department description.
   */
  description?: string;

  /**
   * Department name.
   */
  name: string;

  /**
   * Department users Ids.
   */
  usersIds?: Array<string>;
}
