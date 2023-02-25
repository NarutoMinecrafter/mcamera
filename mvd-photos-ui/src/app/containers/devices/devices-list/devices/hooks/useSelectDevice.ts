import {useCallback} from 'react';
import {useHistory, useParams} from 'react-router-dom';

export const useSelectDevice = () => {
    const history = useHistory();
    const {id} = useParams<{id?: string}>();

    const handleSelectDevice = useCallback((deviceId: number) => {
        history.push(`/devices/${deviceId}`);
    }, []);

    return {
        selected: +(id || ''),
        handleSelectDevice
    };
};
