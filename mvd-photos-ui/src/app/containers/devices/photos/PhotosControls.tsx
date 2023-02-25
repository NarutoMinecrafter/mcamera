import React, {useCallback} from 'react';
import {SourceName} from './constants';
import {Checkbox, FormControlLabel, FormGroup} from '@material-ui/core';
import {PhotoSourceEnum} from 'openapi/src';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import Box from '@material-ui/core/Box';

type Props = {
    filters: PhotoSourceEnum[];
    changeFilters: (val: PhotoSourceEnum[]) => void;
    changeEditMode: (val: boolean) => void;
    changeSelectAll: (val: boolean) => void;
    handleRemove: () => void;
    handleDownload: () => void;
    editMode: boolean;
    selectAll: boolean;
}

export const PhotosControls: React.FC<Props> = ({
    filters, changeFilters, changeEditMode,
    changeSelectAll, editMode, handleDownload, handleRemove,
    selectAll
}) => {
    const handleChangeFilter = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;
        const name = event.target.name as PhotoSourceEnum;
        if (!value) {
            changeFilters(filters.filter(f => f !== name));
        } else {
            changeFilters([...filters, name]);
        }
    }, [filters]);

    const handleChangeEditMode = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeEditMode(event.target.checked);
    };

    const handleChangeSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeSelectAll(event.target.checked);
    };

    return (
        <Box display="flex" flexWrap="wrap" justifyContent="space-around">
            <FormGroup row>
                {Object.values(PhotoSourceEnum).map((s) => (
                    <FormControlLabel
                        key={s}
                        control={
                            <Checkbox
                                checked={filters.includes(s)}
                                onChange={handleChangeFilter}
                                color="primary"
                            />
                        }
                        name={s}
                        label={SourceName[s]}
                    />
                ))}
            </FormGroup>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={editMode}
                            onChange={handleChangeEditMode}
                            color="primary"
                        />
                    }
                    label="Вибрати"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectAll}
                            onChange={handleChangeSelectAll}
                            color="primary"
                            disabled={!editMode}
                        />
                    }
                    label="Вибрати всі"
                />
                <IconButton onClick={handleRemove} disabled={!editMode} color="secondary" >
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={handleDownload} disabled={!editMode} color="primary">
                    <DownloadIcon />
                </IconButton>
            </FormGroup>
        </Box>
    );
};
