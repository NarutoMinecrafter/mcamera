import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import {PermissionsTextMapper, PermissionsValues} from './constants';
import {UsePermissionsType} from './usePermissions';

type Props = {
    disabled?: boolean;
    handleChange?: UsePermissionsType['handleChange'];
    permissionsValues: UsePermissionsType['permissionsValues'];
};

export const Permissions: React.FC<Props> = ({permissionsValues, disabled = false, handleChange}) => {
    return (
        <Box>
            <FormGroup row>
                {PermissionsValues.map((type) => (
                    <FormControlLabel
                        key={type}
                        control={(
                            <Checkbox
                                checked={permissionsValues[type]}
                                onChange={handleChange ? handleChange(type) : undefined}
                                value={permissionsValues[type]}
                                disabled={disabled}
                            />
                        )}
                        label={PermissionsTextMapper[type].title}
                        title={PermissionsTextMapper[type].description}
                    />
                ))}
            </FormGroup>
        </Box>
    );
};
