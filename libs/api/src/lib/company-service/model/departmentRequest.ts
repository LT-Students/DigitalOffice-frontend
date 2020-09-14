/**
 * CompanyService
 * CompanyService is an API intended to work with the positions, companies, dep  **Changes since 0.0.0** -
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface DepartmentRequest { 
    /**
     * Department name.
     */
    name?: string;
    /**
     * Description of Department.
     */
    description?: string;
    /**
     * User global unique identifier.
     */
    directorUserId?: string;
    /**
     * Company global unique identifier.
     */
    companyId?: string;
    /**
     * Does the Department work?
     */
    isActive?: boolean;
}