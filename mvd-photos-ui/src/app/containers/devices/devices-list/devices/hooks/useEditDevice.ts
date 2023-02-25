import {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {CreateDeviceDto} from 'openapi/src';
import {useDevicesService} from '../../../../../services/devices/useDevicesService';
import {DefaultValues} from '../../../../../constants';
import {devicesSelectors} from '../../../../../services/devices/devicesSliceAdapter';

export const useEditDevice = () => {
    const {updateDevice} = useDevicesService();
    const [updatedDevice, setUpdatedDevice] = useState<number>(-1);
    const deviceToUpdate = useSelector(state => devicesSelectors.selectById(state, updatedDevice));

    const handleEditDevice = useCallback((obj: CreateDeviceDto, id: number) => {
        updateDevice(id, {
            ...DefaultValues,
            ...obj
        });
        setUpdatedDevice(-1);
    }, [updateDevice]);

    const handleOpenEditModal = useCallback((id: number) => {
        setUpdatedDevice(id);
    }, []);

    const handleCloseEditModal = useCallback(() => {
        setUpdatedDevice(-1);
    }, []);

    return {
        handleEditDevice,
        deviceToUpdate,
        handleOpenEditModal,
        handleCloseEditModal
    };
};
