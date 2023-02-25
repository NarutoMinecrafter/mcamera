import {useCallback} from 'react';
import {AddDeviceType} from '../types';
import {useDevicesService} from '../../../../../services/devices/useDevicesService';
import {DefaultValues} from '../../../../../constants';
import {useModal} from '../../../../../hooks/useModal';

export const useAddDevice = () => {
    const {createDevice} = useDevicesService();
    const {showModal, handleOpenModal, handleCloseModal} = useModal();
    const handleAddDevice = useCallback((obj: AddDeviceType) => {
        createDevice({
            ...DefaultValues,
            ...obj
        });
        handleCloseModal();
    }, [createDevice]);

    return {
        handleAddDevice,
        showAddModal: showModal,
        handleOpenAddModal: handleOpenModal,
        handleCloseAddModal: handleCloseModal
    };
};
