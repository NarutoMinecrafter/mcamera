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
import {
    User,
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './';

/**
 * 
 * @export
 * @interface Permission
 */
export interface Permission {
    /**
     * 
     * @type {number}
     * @memberof Permission
     */
    id: number;
    /**
     * 
     * @type {boolean}
     * @memberof Permission
     */
    addDevice: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Permission
     */
    removeDevice: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Permission
     */
    editDevice: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Permission
     */
    download: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Permission
     */
    removePhoto: boolean;
    /**
     * 
     * @type {User}
     * @memberof Permission
     */
    user: User;
    /**
     * 
     * @type {number}
     * @memberof Permission
     */
    userId: number;
}

export function PermissionFromJSON(json: any): Permission {
    return PermissionFromJSONTyped(json, false);
}

export function PermissionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Permission {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'addDevice': json['addDevice'],
        'removeDevice': json['removeDevice'],
        'editDevice': json['editDevice'],
        'download': json['download'],
        'removePhoto': json['removePhoto'],
        'user': UserFromJSON(json['user']),
        'userId': json['userId'],
    };
}

export function PermissionToJSON(value?: Permission | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'addDevice': value.addDevice,
        'removeDevice': value.removeDevice,
        'editDevice': value.editDevice,
        'download': value.download,
        'removePhoto': value.removePhoto,
        'user': UserToJSON(value.user),
        'userId': value.userId,
    };
}


