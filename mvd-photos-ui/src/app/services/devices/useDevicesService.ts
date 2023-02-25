import {Configuration, CreateDeviceDto, DevicesApi} from 'openapi/src';
import {getToken} from 'helpers/auth';
import {toast} from 'react-toastify';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {devicesSlice} from './devicesSliceAdapter';
import {postMiddleware} from '../postMiddleware';
import {getBasePath} from '../basePath';
import {usersSlice} from '../user';


const devicesApi = new DevicesApi(new Configuration({
    accessToken: getToken,
    basePath: getBasePath()
}));

export const useDevicesService = () => {

    const dispatch = useDispatch();


    const getDevices = useCallback(() => {
        const getDevices = async () => {
            try {
                const devices = await devicesApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .devicesControllerGetUserDevices();
                dispatch(devicesSlice.actions.devicesReceived(devices));
            } catch (e) {
                toast.error(e.statusText);
            }
        };
        return getDevices();
    }, []);

    const updateDevice = useCallback((id: number, updatedDevice: CreateDeviceDto) => {
        const updateDeviceAsync = async () => {
            try {
                const device = await devicesApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .devicesControllerUpdateDevice({
                        id, createDeviceDto: updatedDevice
                    });
                dispatch(devicesSlice.actions.updateDevice({
                    changes: device,
                    id
                }));
                toast.success('Дані відправлені на сервер. Слідкуйте за зміною "Статус Пакета".');
                return true;
            } catch (e) {
                toast.error(e.statusText);
                return false;
            }
        };
        return updateDeviceAsync();
    }, []);

    const removeDevice = useCallback((id: number) => {
        const removeDeviceAsync = async () => {
            try {
                await devicesApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .devicesControllerDeleteDeviceRaw({id});
                dispatch(devicesSlice.actions.removeDevice(id));
                toast.success('Пристрій успішно видалено.');
            } catch (e) {
                toast.error(e.statusText);
            }
        };
        return removeDeviceAsync();
    }, []);

    const createDevice = useCallback((createDeviceDto: CreateDeviceDto) => {
        const createDeviceAsync = async () => {
            try {
                const device = await devicesApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .devicesControllerCreateDevice({createDeviceDto});
                dispatch(devicesSlice.actions.deviceAdded(device));
                toast.success('Новий пристрій успішно доданий.');
                return device;
            } catch (e) {
                toast.error(e.statusText);
                return undefined;
            }
        };
        return createDeviceAsync();
    }, []);

    const createDeviceAdmin = useCallback((createDeviceDto: CreateDeviceDto,  userId: number) => {
        const createDeviceAdminAsync = async () => {
            try {
                const device = await devicesApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .devicesControllerCreateDeviceAdmin({userId, createDeviceDto});
                dispatch(usersSlice.actions.addDeviceActionAdmin({device, userId}));
                toast.success('Новий пристрій успішно доданий.');
                return device;
            } catch (e) {
                toast.error(e.statusText);
                return undefined;
            }
        };
        return createDeviceAdminAsync();
    }, []);

    const removeDeviceAdmin = useCallback((deviceId: number,  userId: number) => {
        const removeDeviceAdminAsync = async () => {
            try {
                await devicesApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .devicesControllerRemoveDeviceAdmin({userId, deviceId});
                dispatch(usersSlice.actions.removeDeviceActionAdmin({deviceId, userId}));
                toast.success('Пристрій успішно видалено.');
            } catch (e) {
                toast.error(e.statusText);
            }
        };
        return removeDeviceAdminAsync();
    }, []);

    const updateDeviceAdmin = useCallback((deviceId: number,  userId: number, updatedDevice: CreateDeviceDto) => {
        const updateDeviceAdminAsync = async () => {
            try {
                const device = await devicesApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .devicesControllerUpdateDeviceAdmin({
                        userId, deviceId, createDeviceDto: updatedDevice
                    });
                dispatch(usersSlice.actions.updateDeviceActionAdmin(device));
                toast.success('Дані відправлені на сервер. Слідкуйте за зміною "Статус Пакета".');
                return true;
            } catch (e) {
                toast.error(e.statusText);
                return false;
            }
        };
        return updateDeviceAdminAsync();
    }, []);


    return {
        updateDevice,
        removeDevice,
        getDevices,
        createDevice,
        createDeviceAdmin,
        removeDeviceAdmin,
        updateDeviceAdmin
    };
};
