import {useEffect, useState} from 'react';
import {FiltersType, RenderProps} from './types';
import {runAllFilters} from './helpers';

export const useFilters = <T extends { id: number }, D>(list: T[], filters: FiltersType<T>, deps: D[] = []) => {
    const [appliedFilters, setAppliedFilters] = useState(filters);
    const [filteredList, setFilteredList] = useState(list);

    useEffect(() => {
        setAppliedFilters(filters);
    }, [...deps]);

    useEffect(() => {
        setFilteredList(runAllFilters(appliedFilters, list));
    }, [list, appliedFilters]);

    const onChangeFilter = <F extends keyof FiltersType<T>>(filterName: F, newValue: T[F]) => {
        setAppliedFilters({
            ...appliedFilters,
            [filterName]: {
                ...appliedFilters[filterName],
                applied: newValue
            }
        });
    };

    const FiltersWrapper = ({children}: RenderProps<T>) => children({
        onChangeFilter, appliedFilters, originalList: list
    });

    return {
        filteredList,
        originalList: list,
        FiltersWrapper,
        onChangeFilter,
        appliedFilters
    };
};
