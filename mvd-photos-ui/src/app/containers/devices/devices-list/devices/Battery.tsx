import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Battery20 from '@material-ui/icons/Battery20';
import Battery30 from '@material-ui/icons/Battery30';
import Battery50 from '@material-ui/icons/Battery50';
import Battery60 from '@material-ui/icons/Battery60';
import Battery80 from '@material-ui/icons/Battery80';
import Battery90 from '@material-ui/icons/Battery90';
import BatteryFull from '@material-ui/icons/BatteryFull';
import Box from '@material-ui/core/Box';

export const BatteryMap = [
    Battery20, Battery20, Battery30, Battery30, Battery50, Battery60, Battery60, Battery80, Battery90, BatteryFull
];

type Props = {
    level: number; // 1-100
}

export const Battery: React.FC<Props> = ({level}) => {
    const BatteryIcon = BatteryMap[Math.ceil(level / 10) - 1];
    return (
        <Box display="flex" alignItems="center">
            {level}%
            <BatteryIcon />
        </Box>
    ) ;
};
