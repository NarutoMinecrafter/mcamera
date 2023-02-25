import {createSelector} from '@reduxjs/toolkit';
import {photosSelectors} from './photosSliceAdapter';

const initialHours = new Array(24)
    .fill(0)
    .map((el, i) => i)
    .reduce<Record<number, number>>((prev, curr) => {
        return {
            ...prev,
            [curr]: 0
        };
    }, {});

export const createPhotosSelectors = () => createSelector(
    photosSelectors.selectAll,
    (photos) => {
        const newHoursValue = {...initialHours};
        photos.forEach(p => {
            const hour = new Date(+p.originaltime).getHours();
            newHoursValue[hour] = newHoursValue[hour] + 1;
        });
        return newHoursValue;
    }
);
