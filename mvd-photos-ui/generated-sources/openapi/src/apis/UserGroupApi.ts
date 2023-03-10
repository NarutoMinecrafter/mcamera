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
    UserGroups,
    UserGroupsFromJSON,
    UserGroupsToJSON,
} from '../models';

export interface UserGroupsControllerDeleteUserGroupRequest {
    userGroupId: number;
}

/**
 * UserGroupApi - interface
 * 
 * @export
 * @interface UserGroupApiInterface
 */
export interface UserGroupApiInterface {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserGroupApiInterface
     */
    userGroupsControllerCreateUserGroupRaw(): Promise<runtime.ApiResponse<UserGroups>>;

    /**
     */
    userGroupsControllerCreateUserGroup(): Promise<UserGroups>;

    /**
     * 
     * @param {number} userGroupId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserGroupApiInterface
     */
    userGroupsControllerDeleteUserGroupRaw(requestParameters: UserGroupsControllerDeleteUserGroupRequest): Promise<runtime.ApiResponse<void>>;

    /**
     */
    userGroupsControllerDeleteUserGroup(requestParameters: UserGroupsControllerDeleteUserGroupRequest): Promise<void>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserGroupApiInterface
     */
    userGroupsControllerGetUserGroupsRaw(): Promise<runtime.ApiResponse<Array<UserGroups>>>;

    /**
     */
    userGroupsControllerGetUserGroups(): Promise<Array<UserGroups>>;

}

/**
 * 
 */
export class UserGroupApi extends runtime.BaseAPI implements UserGroupApiInterface {

    /**
     */
    async userGroupsControllerCreateUserGroupRaw(): Promise<runtime.ApiResponse<UserGroups>> {
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
            path: `/userGroup/admin`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserGroupsFromJSON(jsonValue));
    }

    /**
     */
    async userGroupsControllerCreateUserGroup(): Promise<UserGroups> {
        const response = await this.userGroupsControllerCreateUserGroupRaw();
        return await response.value();
    }

    /**
     */
    async userGroupsControllerDeleteUserGroupRaw(requestParameters: UserGroupsControllerDeleteUserGroupRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.userGroupId === null || requestParameters.userGroupId === undefined) {
            throw new runtime.RequiredError('userGroupId','Required parameter requestParameters.userGroupId was null or undefined when calling userGroupsControllerDeleteUserGroup.');
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
            path: `/userGroup/admin/{userGroupId}`.replace(`{${"userGroupId"}}`, encodeURIComponent(String(requestParameters.userGroupId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async userGroupsControllerDeleteUserGroup(requestParameters: UserGroupsControllerDeleteUserGroupRequest): Promise<void> {
        await this.userGroupsControllerDeleteUserGroupRaw(requestParameters);
    }

    /**
     */
    async userGroupsControllerGetUserGroupsRaw(): Promise<runtime.ApiResponse<Array<UserGroups>>> {
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
            path: `/userGroup/admin`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserGroupsFromJSON));
    }

    /**
     */
    async userGroupsControllerGetUserGroups(): Promise<Array<UserGroups>> {
        const response = await this.userGroupsControllerGetUserGroupsRaw();
        return await response.value();
    }

}
