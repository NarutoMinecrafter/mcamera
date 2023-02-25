import React, {useCallback, useContext, useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import {getBasePath} from '../../../services/basePath';
import {AutoRotatingCarousel, Slide} from 'components/autorotating-carusel';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import {Photo} from 'openapi/src';
import {SourceName} from 'containers/devices/photos/constants';
import {Variant} from '@material-ui/core/styles/createTypography';
import {FormControlLabel, useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {useRestrictions} from '../../../hooks/useRestrictions';
import {useModals} from '../../../services/modals/useModals';
import {makeFrame} from 'helpers/makeFrame';
import {DialogContext} from 'components/alert-dialog';

const path = getBasePath();
const useStyles = makeStyles<Theme, {editMode: boolean; isLast: boolean}>((theme: Theme) =>
    createStyles({
        photo: {
            width: ({isLast}) => isLast ? 'unset' : 148,
            margin: theme.spacing(0, 1, 1, 1),
            position: 'relative'
        },
        photoSelect: {
            display: ({editMode}) => editMode ? 'block': 'none',
            position: 'absolute',
            bottom: theme.spacing(3),
            left: 0,
            backgroundColor: 'white!important',
            '&:hover': {
                backgroundColor: 'white!important'
            }
        },
        label: {
            margin: 0
        }
    })
);

type Props = {
    photos: Photo[];
    removePhotoById: (id: number) => void;
    editMode: boolean;
    isLast: boolean;
    selected: number[];
    onSelect: (val: number) => void;
}

const PhotosTime: React.FC<{photo: Photo; variant: Variant;}> = ({photo, variant}) => (
    <Box display="flex" justifyContent="center">
        <Tooltip title={SourceName[photo.source]} placement="left">
            <Typography variant={variant} style={{marginRight: 2}}>
                {photo.source}
            </Typography>
        </Tooltip>
        <Typography variant={variant}>
            {new Date(+photo.originaltime).toLocaleString('uk-UK')}
        </Typography>
    </Box>
);

export const PhotosPreview: React.FC<Props> = ({
    photos, removePhotoById, selected, editMode, onSelect, isLast
}) => {
    const classes = useStyles({editMode, isLast});
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const [idSelectPhoto, setIdSelectPhoto] = useState<string | number>('')
    const [newPhotos, setNewPhotos] = useState<any[]>([])
    const {setDialogObj} = useContext(DialogContext);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const {isAllowed: removeAllowed} = useRestrictions('removePhoto');
    const {isAllowed: downloadAllowed} = useRestrictions('download');
    const {redirectToModal} = useModals();

    const handleImageClick = useCallback((i: number) => {
        if (editMode) {
            onSelect(photos[i].id);
        } else {
            // console.log(photos[i].id)
            // setIdSelectPhoto(photos[i].id)
            setOpen(true);
            setSelectedPhoto(i);
        }
    }, [onSelect, editMode]);
    
    useEffect(() => {
        setNewPhotos(photos)
    }, [open])

    const handleRemove = useCallback((index: number) => {
        if (removeAllowed) {
            setDialogObj({
                text: 'Видалити фото?',
                title: 'Попередження',
                isShown: true,
                onApprove: () => {
                    setOpen(false);
                    removePhotoById(photos[index].id);
                }
            });
        } else {
            redirectToModal('notAllowed');
        }
    }, [photos, removeAllowed]);

    const handleDownload = useCallback((index: number) => {
        if (downloadAllowed) {
            makeFrame(photos[index].name);
        } else {
            redirectToModal('notAllowed');
        }
    }, [photos, downloadAllowed]);

    if (photos.length === 0) {
        return (
            <Typography>
                Немає Фото
            </Typography>
        );
    }

    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
            {photos.map((p, i) => (
                <Box key={p.id} className={classes.photo}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                className={classes.photoSelect}
                                checked={selected.includes(p.id)}
                                onChange={() => handleImageClick(i)}
                            />
                        }
                        labelPlacement="top"
                        label={(
                            <img
                                src={`${path}/photos/preview/${p.name}`}
                                alt="photo" width="100%"
                                style={isLast ? {cursor: 'pointer', height: 'calc(100vh - 26rem)'} : {cursor: 'pointer'}}
                                loading="lazy"
                            />
                        )}
                        classes={{
                            labelPlacementTop: classes.label
                        }}
                    />
                    <PhotosTime photo={p} variant="caption"/>
                </Box>
            ))}
            <AutoRotatingCarousel
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                open={open}
                label="Закрити"
                onClose={() => setOpen(false)}
                onStart={() => setOpen(false)}
                onSecondaryAction={handleRemove}
                onAdditionalAction={handleDownload}
                autoplay={false}
                mobile={matches}
                style={{position: 'absolute'}}
                startIndex={selectedPhoto}
                photos={newPhotos}
                path={path}
                idSelectPhoto={idSelectPhoto}
            >
                {newPhotos.map((p, i) => (
                    <Slide
                        key={p.id}
                        media={
                            <img src={`${path}/photos/preview/${p.name}`} alt="photo"/>
                        }
                        title={<PhotosTime photo={p} variant="h5"/>}
                    />
                ))}
            </AutoRotatingCarousel>
        </Box>
    );
};
