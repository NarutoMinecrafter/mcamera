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
    Device,
    DeviceFromJSON,
    DeviceFromJSONTyped,
    DeviceToJSON,
    User,
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './';

/**
 * 
 * @export
 * @interface UserGroups
 */
export interface UserGroups {
    /**
     * 
     * @type {number}
     * @memberof UserGroups
     */
    id: number;
    /**
     * 
     * @type {Array<User>}
     * @memberof UserGroups
     */
    users: Array<User>;
    /**
     * 
     * @type {Array<Device>}
     * @memberof UserGroups
     */
    devices: Array<Device>;
}

export function UserGroupsFromJSON(json: any): UserGroups {
    return UserGroupsFromJSONTyped(json, false);
}

export function UserGroupsFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserGroups {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'users': ((json['users'] as Array<any>).map(UserFromJSON)),
        'devices': ((json['devices'] as Array<any>).map(DeviceFromJSON)),
    };
}

export function UserGroupsToJSON(value?: UserGroups | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'users': ((value.users as Array<any>).map(UserToJSON)),
        'devices': ((value.devices as Array<any>).map(DeviceToJSON)),
    };
}


