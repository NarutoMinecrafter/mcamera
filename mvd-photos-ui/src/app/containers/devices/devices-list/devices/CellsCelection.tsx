import React, {useEffect, useRef, useState} from 'react';

import {Photo} from 'openapi/src';
import {usePhotosService} from '../../../../services/photos/usePhotosService';
import {getBasePath} from '../../../../services/basePath';
import {PhotosGrid} from 'containers/devices/photos/PhotosGrid';
import {useLoadImage} from 'containers/devices/devices-list/devices/hooks/useLoadImage';
import {Checkbox, FormControlLabel} from '@material-ui/core';
import Box from '@material-ui/core/Box';


type Props = {
    selected: string[];
    onSelect: (x: number, y: number) => void;
    deviceId: number;
}

const path = getBasePath();

export const CellsCelection: React.FC<Props> = ({selected, onSelect, deviceId}) => {
    const image = useRef<HTMLImageElement | null>(null);
    const [photo, setPhoto] = useState<Photo | undefined>(undefined);
    const [showCells, setShowCells] = useState(true);
    const {getLastPhoto} = usePhotosService();
    const {handleLoad} = useLoadImage();

    useEffect(() => {
        getLastPhoto(deviceId).then(setPhoto);
    }, [getLastPhoto]);


    useEffect(() => {
        if (photo) {
            handleLoad(`${path}/photos/preview/${photo.name}`);
        }
    }, [handleLoad, photo]);

    if (!photo) {
        return null;
    }

    return (
        <Box display="flex" flexDirection="column" mr={2}>
            <div style={{position: 'relative', maxWidth: 640, maxHeight: 480}}>
                <img
                    src={`${path}/photos/preview/${photo.name}`}
                    alt="photo"
                    ref={image}
                    style={{
                        maxHeight: '100%',
                        maxWidth: '100%'
                    }}
                />
                {showCells && (
                    <PhotosGrid
                        width={image.current?.clientWidth || 0}
                        height={image.current?.clientHeight || 0}
                        axisX={10}
                        axisY={10}
                        selected={selected}
                        onSelect={onSelect}
                    />
                )}
            </div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={showCells}
                        onChange={() => setShowCells(prev => !prev)}
                        color="primary"
                    />
                }
                label="Показати Сітку"
            />
        </Box>
    );
};
