import React from 'react';
import {
    Grid,
    makeStyles,
    TextField,
    Theme
} from '@material-ui/core';
import {FiltersType} from '../../hooks/useFilters/types';
import {AllId} from '../../hooks/useFilters';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}));

const filterProps = {
    fullWidth: true,
    select: true,
    SelectProps: {
        native: true
    }
};

type Props<T extends { id: number }> = {
    appliedFilters: FiltersType<T>;
    originalList: T[];
    onChangeFilter: <K extends keyof T>(filterName: keyof T, newValue: T[K]) => void;
};

function Filters<T extends { id: number }>(props: Props<T>) {
    const classes = useStyles();
    const {appliedFilters, originalList, onChangeFilter} = props;

    return (
        <Grid
            container
            className={classes.root}
            spacing={3}
        >
            {(Object.keys(appliedFilters) as [keyof FiltersType<T>]).map((key, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Grid item xs={12} sm={3} key={i}>
                    <TextField
                        variant="outlined"
                        {...filterProps}
                        name="tool"
                        label={appliedFilters[key]?.displayName()}
                        value={appliedFilters[key]?.applied || ''}
                        onChange={(e) => onChangeFilter(key, e.target.value as unknown as T[keyof T])}
                    >
                        <option key={AllId} value={AllId}>Всі</option>
                        {Array.from(new Set(originalList.map(el => appliedFilters[key]?.mapper(el[key]))))
                            .map((toolItem) => (
                                <option key={toolItem} value={toolItem}>
                                    {toolItem}
                                </option>
                            ))}
                    </TextField>
                </Grid>
            ))}
        </Grid>
    );
}

export default Filters;
