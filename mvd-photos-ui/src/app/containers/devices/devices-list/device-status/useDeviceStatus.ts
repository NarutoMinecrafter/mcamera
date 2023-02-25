import {useEffect, useState} from 'react';

const OffInterval = 90 * 1000;

const calculateDiff = (lastUpdateDate: Date) => {
    return Date.now() - lastUpdateDate.getTime() < OffInterval;
};

export const useDeviceStatus = (lastUpdateDate: Date) => {

    const [deviceStatus, setDeviceStatus] = useState(calculateDiff(lastUpdateDate));
    const [timeoutValue, setTimeoutValue] = useState(0);

    useEffect(() => {
        clearTimeout(timeoutValue);
        setDeviceStatus(calculateDiff(lastUpdateDate));
        setTimeoutValue(window.setTimeout(() => {
            if (deviceStatus) {
                setDeviceStatus(false);
            }
        }, OffInterval));
    }, [lastUpdateDate]);


    return {
        deviceStatus
    };
};

