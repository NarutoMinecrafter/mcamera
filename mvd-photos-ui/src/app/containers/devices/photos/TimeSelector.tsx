import React, {useCallback, useState} from 'react';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ukLocale from 'date-fns/locale/uk';
import Grid from '@material-ui/core/Grid';
import {TimeComponent} from 'containers/devices/photos/TimeComponent';

type Props = {
    onLoad: (from: number) => void;
}

export const TimeSelector: React.FC<Props> = ({onLoad}) => {
    const [timeState, setTimeState] = useState(0);
    const [selectedDateFrom, handleDateChangeFrom] = useState<Date | null>(new Date(Date.now()));

    const handleBackDate = () => {
        if (selectedDateFrom) {
            const newDate = selectedDateFrom;
            newDate.setDate(selectedDateFrom.getDate() - 1);
            handleDateChangeFrom(newDate);
            setTimeState(prev => prev + 1);
            onLoad(+newDate);
        }
    };

    const handleForwardDate = useCallback(() => {
        if (selectedDateFrom) {
            const newDate = selectedDateFrom;
            newDate.setDate(selectedDateFrom.getDate() + 1);
            handleDateChangeFrom(newDate);
            setTimeState(prev => prev + 1);
            onLoad(+newDate);
        }
    }, [selectedDateFrom, onLoad]);

    const handleChange = useCallback((date: Date | null) => {
        if (date) {
            handleDateChangeFrom(date);
            onLoad(+date);
        }
    }, [onLoad]);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ukLocale}>
            <Grid container justify="space-evenly" direction="row" alignItems="center" spacing={1}>
                <Grid item>
                    <TimeComponent
                        key={timeState}
                        handleBackDate={handleBackDate}
                        handleChange={handleChange}
                        handleForwardDate={handleForwardDate}
                        value={selectedDateFrom!}
                    />
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
    );
};
