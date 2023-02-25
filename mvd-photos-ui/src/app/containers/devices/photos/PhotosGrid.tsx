import React, {useMemo, useRef} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, {width: number; height: number;}>(() =>
    createStyles({
        root: {
            position: 'absolute',
            left: 0,
            top: 0,
            backgroundColor: 'transparent',
            display: 'flex',
            flexWrap: 'wrap',
            width: props => props.width,
            height: props => props.height
        },
        item: {
            cursor: 'pointer',
            border: '1px solid gray'
        }
    })
);

type Props = {
    axisX: number;
    axisY: number;
    selected: string[];
    onSelect: (x: number, y: number) => void;
    width: number;
    height: number;
};

export const PhotosGrid: React.FC<Props> = ({axisX, axisY, width, height, onSelect, selected}) => {
    const classes = useStyles({width, height});
    const ref = useRef<HTMLDivElement | null>(null);
    const itemWidth = useMemo(() => width / axisX, [width, axisX]);
    const itemHeight = useMemo(() => height / axisY, [height, axisY]);

    const elements = useMemo(() => {
        const arrX = new Array(axisX).fill(0);
        const arrY = new Array(axisY).fill(0);

        return arrY.flatMap((el, y) => arrX.map((el, x) => (
            <div
                key={`${x}${y}`}
                className={classes.item}
                style={{
                    width: itemWidth,
                    height: itemHeight,
                    backgroundColor: `rgba(75, 255, 0, ${selected.includes(`${x},${y}`) ? 0.5 : 0})`
                }}
                onClick={() => onSelect(x, y)}
            />
        )));
    }, [itemWidth, itemHeight, axisX, axisY, selected]) ;


    return (
        <div className={classes.root} ref={ref}>
            {elements}
        </div>
    );
};
