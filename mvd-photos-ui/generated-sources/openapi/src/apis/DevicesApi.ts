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
    CreateDeviceDto,
    CreateDeviceDtoFromJSON,
    CreateDeviceDtoToJSON,
    Device,
    DeviceFromJSON,
    DeviceToJSON,
} from '../models';

export interface DevicesControllerCreateDeviceRequest {
    createDeviceDto: CreateDeviceDto;
}

export interface DevicesControllerCreateDeviceAdminRequest {
    userId: number;
    createDeviceDto: CreateDeviceDto;
}

export interface DevicesControllerDeleteDeviceRequest {
    id: number;
}

export interface DevicesControllerGetDeviceByIdRequest {
    id: number;
}

export interface DevicesControllerRemoveDeviceAdminRequest {
    userId: number;
    deviceId: number;
}

export interface DevicesControllerUpdateDeviceRequest {
    id: number;
    createDeviceDto: CreateDeviceDto;
}

export interface DevicesControllerUpdateDeviceAdminRequest {
    userId: number;
    deviceId: number;
    createDeviceDto: CreateDeviceDto;
}

/**
 * DevicesApi - interface
 * 
 * @export
 * @interface DevicesApiInterface
 */
export interface DevicesApiInterface {
    /**
     * 
     * @param {CreateDeviceDto} createDeviceDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DevicesApiInterface
     */
    devicesControllerCreateDeviceRaw(requestParameters: DevicesControllerCreateDeviceRequest): Promise<runtime.ApiResponse<Device>>;

    /**
     */
    devicesControllerCreateDevice(requestParameters: DevicesControllerCreateDeviceRequest): Promise<Device>;

    /**
     * 
     * @param {number} userId 
     * @param {CreateDeviceDto} createDeviceDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DevicesApiInterface
     */
    devicesControllerCreateDeviceAdminRaw(requestParameters: DevicesControllerCreateDeviceAdminRequest): Promise<runtime.ApiResponse<Device>>;

    /**
     */
    devicesControllerCreateDeviceAdmin(requestParameters: DevicesControllerCreateDeviceAdminRequest): Promise<Device>;

    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DevicesApiInterface
     */
    devicesControllerDeleteDeviceRaw(requestParameters: DevicesControllerDeleteDeviceRequest): Promise<runtime.ApiResponse<void>>;

    /**
     */
    devicesControllerDeleteDevice(requestParameters: DevicesControllerDeleteDeviceRequest): Promise<void>;

    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DevicesApiInterface
     */
    devicesControllerGetDeviceByIdRaw(requestParameters: DevicesControllerGetDeviceByIdRequest): Promise<runtime.ApiResponse<Device>>;

    /**
     */
    devicesControllerGetDeviceById(requestParameters: DevicesControllerGetDeviceByIdRequest): Promise<Device>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DevicesApiInterface
     */
    devicesControllerGetUserDevicesRaw(): Promise<runtime.ApiResponse<Array<Device>>>;

    /**
     */
    devicesControllerGetUserDevices(): Promise<Array<Device>>;

    /**
     * 
     * @param {number} userId 
     * @param {number} deviceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DevicesApiInterface
     */
    devicesControllerRemoveDeviceAdminRaw(requestParameters: DevicesControllerRemoveDeviceAdminRequest): Promise<runtime.ApiResponse<void>>;

    /**
     */
    devicesControllerRemoveDeviceAdmin(requestParameters: DevicesControllerRemoveDeviceAdminRequest): Promise<void>;

    /**
     * 
     * @param {number} id 
     * @param {CreateDeviceDto} createDeviceDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DevicesApiInterface
     */
    devicesControllerUpdateDeviceRaw(requestParameters: DevicesControllerUpdateDeviceRequest): Promise<runtime.ApiResponse<Device>>;

    /**
     */
    devicesControllerUpdateDevice(requestParameters: DevicesControllerUpdateDeviceRequest): Promise<Device>;

    /**
     * 
     * @param {number} userId 
     * @param {number} deviceId 
     * @param {CreateDeviceDto} createDeviceDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DevicesApiInterface
     */
    devicesControllerUpdateDeviceAdminRaw(requestParameters: DevicesControllerUpdateDeviceAdminRequest): Promise<runtime.ApiResponse<Device>>;

    /**
     */
    devicesControllerUpdateDeviceAdmin(requestParameters: DevicesControllerUpdateDeviceAdminRequest): Promise<Device>;

}

/**
 * 
 */
export class DevicesApi extends runtime.BaseAPI implements DevicesApiInterface {

    /**
     */
    async devicesControllerCreateDeviceRaw(requestParameters: DevicesControllerCreateDeviceRequest): Promise<runtime.ApiResponse<Device>> {
        if (requestParameters.createDeviceDto === null || requestParameters.createDeviceDto === undefined) {
            throw new runtime.RequiredError('createDeviceDto','Required parameter requestParameters.createDeviceDto was null or undefined when calling devicesControllerCreateDevice.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/devices`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateDeviceDtoToJSON(requestParameters.createDeviceDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DeviceFromJSON(jsonValue));
    }

    /**
     */
    async devicesControllerCreateDevice(requestParameters: DevicesControllerCreateDeviceRequest): Promise<Device> {
        const response = await this.devicesControllerCreateDeviceRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async devicesControllerCreateDeviceAdminRaw(requestParameters: DevicesControllerCreateDeviceAdminRequest): Promise<runtime.ApiResponse<Device>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling devicesControllerCreateDeviceAdmin.');
        }

        if (requestParameters.createDeviceDto === null || requestParameters.createDeviceDto === undefined) {
            throw new runtime.RequiredError('createDeviceDto','Required parameter requestParameters.createDeviceDto was null or undefined when calling devicesControllerCreateDeviceAdmin.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/devices/admin/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateDeviceDtoToJSON(requestParameters.createDeviceDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DeviceFromJSON(jsonValue));
    }

    /**
     */
    async devicesControllerCreateDeviceAdmin(requestParameters: DevicesControllerCreateDeviceAdminRequest): Promise<Device> {
        const response = await this.devicesControllerCreateDeviceAdminRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async devicesControllerDeleteDeviceRaw(requestParameters: DevicesControllerDeleteDeviceRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling devicesControllerDeleteDevice.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/devices/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async devicesControllerDeleteDevice(requestParameters: DevicesControllerDeleteDeviceRequest): Promise<void> {
        await this.devicesControllerDeleteDeviceRaw(requestParameters);
    }

    /**
     */
    async devicesControllerGetDeviceByIdRaw(requestParameters: DevicesControllerGetDeviceByIdRequest): Promise<runtime.ApiResponse<Device>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling devicesControllerGetDeviceById.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/devices/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DeviceFromJSON(jsonValue));
    }

    /**
     */
    async devicesControllerGetDeviceById(requestParameters: DevicesControllerGetDeviceByIdRequest): Promise<Device> {
        const response = await this.devicesControllerGetDeviceByIdRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async devicesControllerGetUserDevicesRaw(): Promise<runtime.ApiResponse<Array<Device>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/devices`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(DeviceFromJSON));
    }

    /**
     */
    async devicesControllerGetUserDevices(): Promise<Array<Device>> {
        const response = await this.devicesControllerGetUserDevicesRaw();
        return await response.value();
    }

    /**
     */
    async devicesControllerRemoveDeviceAdminRaw(requestParameters: DevicesControllerRemoveDeviceAdminRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling devicesControllerRemoveDeviceAdmin.');
        }

        if (requestParameters.deviceId === null || requestParameters.deviceId === undefined) {
            throw new runtime.RequiredError('deviceId','Required parameter requestParameters.deviceId was null or undefined when calling devicesControllerRemoveDeviceAdmin.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/devices/admin/{userId}/{deviceId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))).replace(`{${"deviceId"}}`, encodeURIComponent(String(requestParameters.deviceId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async devicesControllerRemoveDeviceAdmin(requestParameters: DevicesControllerRemoveDeviceAdminRequest): Promise<void> {
        await this.devicesControllerRemoveDeviceAdminRaw(requestParameters);
    }

    /**
     */
    async devicesControllerUpdateDeviceRaw(requestParameters: DevicesControllerUpdateDeviceRequest): Promise<runtime.ApiResponse<Device>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling devicesControllerUpdateDevice.');
        }

        if (requestParameters.createDeviceDto === null || requestParameters.createDeviceDto === undefined) {
            throw new runtime.RequiredError('createDeviceDto','Required parameter requestParameters.createDeviceDto was null or undefined when calling devicesControllerUpdateDevice.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/devices/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: CreateDeviceDtoToJSON(requestParameters.createDeviceDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DeviceFromJSON(jsonValue));
    }

    /**
     */
    async devicesControllerUpdateDevice(requestParameters: DevicesControllerUpdateDeviceRequest): Promise<Device> {
        const response = await this.devicesControllerUpdateDeviceRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async devicesControllerUpdateDeviceAdminRaw(requestParameters: DevicesControllerUpdateDeviceAdminRequest): Promise<runtime.ApiResponse<Device>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling devicesControllerUpdateDeviceAdmin.');
        }

        if (requestParameters.deviceId === null || requestParameters.deviceId === undefined) {
            throw new runtime.RequiredError('deviceId','Required parameter requestParameters.deviceId was null or undefined when calling devicesControllerUpdateDeviceAdmin.');
        }

        if (requestParameters.createDeviceDto === null || requestParameters.createDeviceDto === undefined) {
            throw new runtime.RequiredError('createDeviceDto','Required parameter requestParameters.createDeviceDto was null or undefined when calling devicesControllerUpdateDeviceAdmin.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/devices/admin/{userId}/{deviceId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))).replace(`{${"deviceId"}}`, encodeURIComponent(String(requestParameters.deviceId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateDeviceDtoToJSON(requestParameters.createDeviceDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DeviceFromJSON(jsonValue));
    }

    /**
     */
    async devicesControllerUpdateDeviceAdmin(requestParameters: DevicesControllerUpdateDeviceAdminRequest): Promise<Device> {
        const response = await this.devicesControllerUpdateDeviceAdminRaw(requestParameters);
        return await response.value();
    }

}
