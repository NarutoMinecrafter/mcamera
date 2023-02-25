import {ReactElement} from 'react';
import {AllId} from './constants';

export type FiltersType<T extends { id: number }> = {
    [key in keyof T]?: {
        displayName: () => string;
        applied: T[key] | typeof AllId;
        mapper: (el: T[key]) => string;
    }
}

export type RenderProps<T extends { id: number }> = {
    children: (props: {
        onChangeFilter: <K extends keyof T>(filterName: keyof T, newValue: T[K]) => void;
        appliedFilters: FiltersType<T>;
        originalList: T[];
    }) => ReactElement
}
