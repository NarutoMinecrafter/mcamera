import React from 'react';

import {DevicesController} from './devices-list';
import {DevicesLayout} from './Devices.layout';
import {Photos} from './photos';

export const DevicesModule: React.FC = () => {

    return (
        <DevicesLayout>
            <DevicesController />
            <Photos />
        </DevicesLayout>
    );
};
