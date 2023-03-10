/* tslint:disable */
/* eslint-disable */
/**
 * Mvd
 * The Mvd API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AuthCredentialsDto
 */
export interface AuthCredentialsDto {
    /**
     * 
     * @type {string}
     * @memberof AuthCredentialsDto
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof AuthCredentialsDto
     */
    password: string;
    /**
     * 
     * @type {boolean}
     * @memberof AuthCredentialsDto
     */
    isAdmin?: boolean;
}

export function AuthCredentialsDtoFromJSON(json: any): AuthCredentialsDto {
    return AuthCredentialsDtoFromJSONTyped(json, false);
}

export function AuthCredentialsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthCredentialsDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'username': json['username'],
        'password': json['password'],
        'isAdmin': !exists(json, 'isAdmin') ? undefined : json['isAdmin'],
    };
}

export function AuthCredentialsDtoToJSON(value?: AuthCredentialsDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'username': value.username,
        'password': value.password,
        'isAdmin': value.isAdmin,
    };
}


