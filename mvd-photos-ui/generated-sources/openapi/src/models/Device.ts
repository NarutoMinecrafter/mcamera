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
    Packet,
    PacketFromJSON,
    PacketFromJSONTyped,
    PacketToJSON,
    Photo,
    PhotoFromJSON,
    PhotoFromJSONTyped,
    PhotoToJSON,
    UserGroups,
    UserGroupsFromJSON,
    UserGroupsFromJSONTyped,
    UserGroupsToJSON,
} from './';

/**
 * 
 * @export
 * @interface Device
 */
export interface Device {
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    identifier: string;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    battery: number;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    randomSymbols: string;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    scheduleFrequencyPhoto: number;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    scheduleDurationPhoto: number;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    scheduleFramesQuantity: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof Device
     */
    movementCells: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    movementDiffLevel: number;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    movementChangeFrameTime: number;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    movementFrequencyAnalyzing: number;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    circleDurationBeforeMoveSensor: number;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    circleFramesQuantityBeforeMove: number;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    circleDurationDuringMoveSensorUnit: DeviceCircleDurationDuringMoveSensorUnitEnum;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    circleDurationDuringMoveSensor: number;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    circleFramesQuantityDuringMove: number;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    circleDurationAfterMoveSensor: number;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    circleFramesQuantityAfterMove: number;
    /**
     * 
     * @type {UserGroups}
     * @memberof Device
     */
    userGroups: UserGroups;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    userGroupsId: number;
    /**
     * 
     * @type {Packet}
     * @memberof Device
     */
    packet: Packet;
    /**
     * 
     * @type {Photo}
     * @memberof Device
     */
    photo: Photo;
}

export function DeviceFromJSON(json: any): Device {
    return DeviceFromJSONTyped(json, false);
}

export function DeviceFromJSONTyped(json: any, ignoreDiscriminator: boolean): Device {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'identifier': json['identifier'],
        'name': json['name'],
        'battery': json['battery'],
        'randomSymbols': json['randomSymbols'],
        'scheduleFrequencyPhoto': json['scheduleFrequencyPhoto'],
        'scheduleDurationPhoto': json['scheduleDurationPhoto'],
        'scheduleFramesQuantity': json['scheduleFramesQuantity'],
        'movementCells': json['movementCells'],
        'movementDiffLevel': json['movementDiffLevel'],
        'movementChangeFrameTime': json['movementChangeFrameTime'],
        'movementFrequencyAnalyzing': json['movementFrequencyAnalyzing'],
        'circleDurationBeforeMoveSensor': json['circleDurationBeforeMoveSensor'],
        'circleFramesQuantityBeforeMove': json['circleFramesQuantityBeforeMove'],
        'circleDurationDuringMoveSensorUnit': json['circleDurationDuringMoveSensorUnit'],
        'circleDurationDuringMoveSensor': json['circleDurationDuringMoveSensor'],
        'circleFramesQuantityDuringMove': json['circleFramesQuantityDuringMove'],
        'circleDurationAfterMoveSensor': json['circleDurationAfterMoveSensor'],
        'circleFramesQuantityAfterMove': json['circleFramesQuantityAfterMove'],
        'userGroups': UserGroupsFromJSON(json['userGroups']),
        'userGroupsId': json['userGroupsId'],
        'packet': PacketFromJSON(json['packet']),
        'photo': PhotoFromJSON(json['photo']),
    };
}

export function DeviceToJSON(value?: Device | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'identifier': value.identifier,
        'name': value.name,
        'battery': value.battery,
        'randomSymbols': value.randomSymbols,
        'scheduleFrequencyPhoto': value.scheduleFrequencyPhoto,
        'scheduleDurationPhoto': value.scheduleDurationPhoto,
        'scheduleFramesQuantity': value.scheduleFramesQuantity,
        'movementCells': value.movementCells,
        'movementDiffLevel': value.movementDiffLevel,
        'movementChangeFrameTime': value.movementChangeFrameTime,
        'movementFrequencyAnalyzing': value.movementFrequencyAnalyzing,
        'circleDurationBeforeMoveSensor': value.circleDurationBeforeMoveSensor,
        'circleFramesQuantityBeforeMove': value.circleFramesQuantityBeforeMove,
        'circleDurationDuringMoveSensorUnit': value.circleDurationDuringMoveSensorUnit,
        'circleDurationDuringMoveSensor': value.circleDurationDuringMoveSensor,
        'circleFramesQuantityDuringMove': value.circleFramesQuantityDuringMove,
        'circleDurationAfterMoveSensor': value.circleDurationAfterMoveSensor,
        'circleFramesQuantityAfterMove': value.circleFramesQuantityAfterMove,
        'userGroups': UserGroupsToJSON(value.userGroups),
        'userGroupsId': value.userGroupsId,
        'packet': PacketToJSON(value.packet),
        'photo': PhotoToJSON(value.photo),
    };
}

/**
* @export
* @enum {string}
*/
export enum DeviceCircleDurationDuringMoveSensorUnitEnum {
    Seconds = 'Seconds',
    Minutes = 'Minutes'
}

