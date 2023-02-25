import React, {useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import {ONLINE_INDEX} from 'containers/devices/photos/constants';

const useStyles = makeStyles({
    link: {
        cursor: 'pointer'
    },
    cellTitle: {
        paddingLeft: 16
    },
    linkSelected: {
        backgroundColor: 'lightgray'
    }
});
type Props = {
    items: Record<number, number>;
    selectHour: (val: number) => void;
    selectedHour: number;
}


export const TimeTable: React.FC<Props> = ({items, selectHour, selectedHour}) => {
    const classes = useStyles();
    const handleClick = useCallback((event: React.SyntheticEvent, hour: number) => {
        event.preventDefault();
        selectHour(hour);
    }, [selectHour]);
    return (
        <TableContainer component={Paper}>
            <Table size="small" padding="none">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.cellTitle}>Години</TableCell>
                        {Object.entries(items).map(([key]) => (
                            <TableCell key={key}>
                                {key}
                            </TableCell>
                        ))}
                        <TableCell>Зараз</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.cellTitle}>Знимків</TableCell>
                        {Object.entries(items).map(([key, val]) => (
                            <TableCell key={key}>
                                <Link
                                    onClick={(e: React.SyntheticEvent) => handleClick(e, +key)}
                                    className={clsx(classes.link, selectedHour === +key && classes.linkSelected)}>
                                    {val}
                                </Link>
                            </TableCell>
                        ))}
                        <TableCell>
                            <Link
                                onClick={(e: React.SyntheticEvent) => handleClick(e, ONLINE_INDEX)}
                                className={clsx(classes.link, selectedHour === ONLINE_INDEX && classes.linkSelected)}>
                                Online
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};
