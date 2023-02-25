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
} from './';

/**
 * 
 * @export
 * @interface Packet
 */
export interface Packet {
    /**
     * 
     * @type {number}
     * @memberof Packet
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof Packet
     */
    status: PacketStatusEnum;
    /**
     * 
     * @type {Device}
     * @memberof Packet
     */
    device: Device;
    /**
     * 
     * @type {number}
     * @memberof Packet
     */
    deviceId: number;
    /**
     * 
     * @type {Date}
     * @memberof Packet
     */
    lastPacketTime: Date;
}

export function PacketFromJSON(json: any): Packet {
    return PacketFromJSONTyped(json, false);
}

export function PacketFromJSONTyped(json: any, ignoreDiscriminator: boolean): Packet {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'status': json['status'],
        'device': DeviceFromJSON(json['device']),
        'deviceId': json['deviceId'],
        'lastPacketTime': (new Date(json['lastPacketTime'])),
    };
}

export function PacketToJSON(value?: Packet | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'status': value.status,
        'device': DeviceToJSON(value.device),
        'deviceId': value.deviceId,
        'lastPacketTime': (value.lastPacketTime.toISOString()),
    };
}

/**
* @export
* @enum {string}
*/
export enum PacketStatusEnum {
    TOSEND = 'TO_SEND',
    SENDING = 'SENDING',
    NONE = 'NONE'
}

