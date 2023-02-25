import {FiltersType} from './types';
import {AllId} from './constants';

export const runAllFilters = <T extends { id: number }>(
    appliedFilters: FiltersType<T>,
    list: T[]
) => {
    const keys = Object.keys(appliedFilters) as [keyof FiltersType<T>];
    return keys.reduce<T[]>((prev, curr) => prev
        .filter(el => appliedFilters[curr]?.applied === AllId
            || appliedFilters[curr]?.mapper(el[curr]) === appliedFilters[curr]?.applied), list);
};
