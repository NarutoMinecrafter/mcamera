import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';

type Props = {
    label: string;
    name: string;
    type: string;
}

export const CustomInput: React.FC<Props> = ({label, name, type}) => (
    <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="caption" style={{marginRight: 8}}>
            {label}
        </Typography>
        <Field
            component={TextField}
            type={type}
            variant="outlined"
            InputLabelProps={{shrink: true}}
            size="small"
            name={name}
        />
    </Box>
);
