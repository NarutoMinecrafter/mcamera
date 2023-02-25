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


import * as runtime from '../runtime';
import {
    Packet,
    PacketFromJSON,
    PacketToJSON,
} from '../models';

export interface PacketsControllerUpdatePacketStatusRequest {
    id: number;
}

/**
 * PacketsApi - interface
 * 
 * @export
 * @interface PacketsApiInterface
 */
export interface PacketsApiInterface {
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PacketsApiInterface
     */
    packetsControllerUpdatePacketStatusRaw(requestParameters: PacketsControllerUpdatePacketStatusRequest): Promise<runtime.ApiResponse<Packet>>;

    /**
     */
    packetsControllerUpdatePacketStatus(requestParameters: PacketsControllerUpdatePacketStatusRequest): Promise<Packet>;

}

/**
 * 
 */
export class PacketsApi extends runtime.BaseAPI implements PacketsApiInterface {

    /**
     */
    async packetsControllerUpdatePacketStatusRaw(requestParameters: PacketsControllerUpdatePacketStatusRequest): Promise<runtime.ApiResponse<Packet>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling packetsControllerUpdatePacketStatus.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/packets/{id}/status`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PacketFromJSON(jsonValue));
    }

    /**
     */
    async packetsControllerUpdatePacketStatus(requestParameters: PacketsControllerUpdatePacketStatusRequest): Promise<Packet> {
        const response = await this.packetsControllerUpdatePacketStatusRaw(requestParameters);
        return await response.value();
    }

}
