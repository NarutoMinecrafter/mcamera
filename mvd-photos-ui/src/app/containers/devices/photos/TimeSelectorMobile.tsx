import React, {useCallback} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import {ONLINE_INDEX} from 'containers/devices/photos/constants';

type Props = {
    items: Record<number, number>;
    selectHour: (val: number) => void;
    selectedHour: number;
}

export const TimeSelectorMobile: React.FC<Props> = ({items, selectHour, selectedHour}) => {
    const handleClick = useCallback((event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        event.preventDefault();
        selectHour(+(event.target.value as string));
    }, [selectHour]);
    return (
        <FormControl fullWidth>
            <InputLabel>Оберіть годину</InputLabel>
            <NativeSelect
                value={selectedHour}
                onChange={handleClick}
            >
                <option value={ONLINE_INDEX}>Online</option>
                {Object.entries(items).map(([key, value]) => (
                    <option value={key} key={key}>
                        {`${key} Hours (${value} photos)`}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    );
};
