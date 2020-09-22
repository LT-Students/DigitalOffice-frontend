/**
 * AuthenticationService
 * AuthenticationService is an API intended to work with user authentication, create jwt token for user.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface AuthenticationResponse { 
    /**
     * User global unique identifier.
     */
    userId?: string;
    /**
     * Generation new JSON Web Token.
     */
    token?: string;
}
