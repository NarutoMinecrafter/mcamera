import React from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Box from '@material-ui/core/Box';

type Props = {
    value: Date;
    handleBackDate: () => void;
    handleForwardDate: () => void;
    handleChange: (date: Date | null) => void
}

const FormatDate = 'dd MMM yyyy';

export const TimeComponent: React.FC<Props> = ({
    value, handleBackDate, handleForwardDate, handleChange
}) => {
    return (
        <Box display="flex" alignItems="center">
            <IconButton onClick={handleBackDate}>
                <ArrowBackIosIcon />
            </IconButton>
            <KeyboardDatePicker
                label="Дата"
                inputVariant="outlined"
                value={value}
                onChange={handleChange}
                format={FormatDate}
            />
            <IconButton onClick={handleForwardDate}>
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
};

