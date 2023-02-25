import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {TimeSelector} from './TimeSelector';
import {TimeSelectorMobile} from './TimeSelectorMobile';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import {photosSelectors, photosSlice} from '../../../services/photos/photosSliceAdapter';
import {usePhotosService} from '../../../services/photos/usePhotosService';
import {PhotosPreview} from './PhotosPreview';
import {PhotosLayout} from './Photos.layout';
import Typography from '@material-ui/core/Typography';
import {Photo, PhotoSourceEnum} from 'openapi/src';
import {PhotosControls} from './PhotosControls';
import {makeFrame} from 'helpers/makeFrame';
import {DialogContext} from 'components/alert-dialog';
import {TimeTable} from './TimeTable';
import {createPhotosSelectors} from '../../../services/photos/photosSelectors';
import {ONLINE_INDEX} from 'containers/devices/photos/constants';
import {useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const photosSelectorsCustom = createPhotosSelectors();
const Messages = {
    start: 'Фотографії відсутні. Оберіть пристрій та натисніть завантажити.',
    error: 'Помилка. Спробуйте ще раз',
    empty: 'Немає фото за заданий період',
    none: ''
};
const PaginationData = {
    perPage: 20,
    selectedPage: 1
};

export const Photos: React.FC = () => {
    const {id} = useParams<{ id?: string }>();
    const {setDialogObj} = useContext(DialogContext);
    const [intervalId, setIntervalId] = useState(0);
    const [message, setMessage] = useState(Messages.none);
    const [selectedDate, setSelectedDate] = useState(Date.now());
    const [filters, setFilters] = useState(Object.values(PhotoSourceEnum));
    const [editMode, setEditMode] = useState(false);
    const [selected, setSelected] = useState<number[]>([]);
    const [selectedHour, setSelectedHour] = useState<number>(ONLINE_INDEX);
    const [lastPhoto, setLastPhoto] = useState<Photo | undefined>(undefined);
    const [selectedPage, setSelectedPage] = useState(PaginationData.selectedPage);
    const dispatch = useDispatch();
    const {getPhotos, removePhotoById, removePhotosById, getLastPhoto} = usePhotosService();
    const photos = useSelector(photosSelectors.selectAll);
    const items = useSelector(photosSelectorsCustom);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const TimeSelectorComponent = useMemo(() => {
        return matches ? TimeTable : TimeSelectorMobile;
    }, [matches, TimeTable, TimeSelectorMobile]);

    const photosFiltered = useMemo(() => {
        if (selectedHour === ONLINE_INDEX && lastPhoto) {
            return [lastPhoto];
        }
        return photos
            .filter(p => filters.includes(p.source))
            .filter(p => new Date(+p.originaltime).getHours() === selectedHour);
    }, [photos, filters, selectedHour, lastPhoto]);

    const shownPhotos = useMemo(() => {
        return photosFiltered.slice((selectedPage - 1) * PaginationData.perPage, selectedPage * PaginationData.perPage);
    }, [photosFiltered, selectedPage]);

    const handleRemove = useCallback(async (id: number) => {
        await removePhotoById(id);
        if (photosFiltered.length === 1) {
            setMessage(Messages.empty);
        }
    }, [removePhotoById, photosFiltered]);

    const handleRemoveMany = useCallback(async () => {
        setDialogObj({
            text: 'Видалити фото?',
            title: 'Попередження',
            isShown: true,
            onApprove: async () => {
                await removePhotosById(selected);
            }
        });
    }, [removePhotosById, selected]);

    const handleDownloadMany = useCallback(async () => {
        selected.forEach(s => {
            const photo = photosFiltered.find(p => p.id === s);
            if (photo) {
                makeFrame(photo.name);
            }
        });
    }, [selected, photosFiltered]);

    const handleSelectAll = useCallback((val: boolean) => {
        setSelected(val ? photosFiltered.map(p => p.id) : []);
    }, [photosFiltered]);

    const handleSelectOne = useCallback((id: number) => {
        const current = selected.find(s => s === id);
        if (current) {
            setSelected(prevValue => prevValue.filter(p => p !== id));
        } else {
            setSelected(prevValue => ([...prevValue, id]));
        }
    }, [selected]);

    const handleLoad = useCallback(async (dateNumber: number) => {
        if (id) {
            const start = new Date(dateNumber);
            start.setHours(0);
            start.setMinutes(0);
            start.setSeconds(0);
            const end = new Date(dateNumber);
            end.setHours(23);
            end.setMinutes(59);
            end.setSeconds(59);
            if (photos.length === 0) {
                setMessage('Загрузка...');
            }
            const photosResponse = await getPhotos(+id, +start, +end);
            if (!photosResponse) {
                setMessage(Messages.error);
            } else if (photosResponse.length === 0) {
                setMessage(Messages.none);
            } else {
                setMessage(Messages.none);
            }
            // setSelectedHour(ONLINE_INDEX);
        }
    }, [id, getPhotos]);

    const handleChangePagination = useCallback((event: React.ChangeEvent<unknown>, page: number) => {
        setSelectedPage(page);
    }, []);

    const selectAllValue = useMemo(() => {
        return photosFiltered.length === selected.length;
    }, [photosFiltered, selected]);

    useEffect(() => {
        handleLoad(selectedDate);
    }, [handleLoad, selectedDate, id, lastPhoto?.id]);

    useEffect(() => {
        clearInterval(intervalId);
        if (id) {
            getLastPhoto(+id).then(setLastPhoto);
            setIntervalId(window.setInterval(() => {
                getLastPhoto(+id).then(setLastPhoto);
            }, 5000));
        }
    }, [id]);

    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        };
    }, [intervalId]);

    useEffect(() => {
        dispatch(photosSlice.actions.photosRemove());
        setMessage(Messages.none);
        setLastPhoto(undefined);
    }, [id]);

    useEffect(() => {
        if (selectedHour === ONLINE_INDEX) {
            setMessage(Messages.none);
        }
        setSelectedPage(1);
    }, [selectedHour]);

    return (
        <PhotosLayout
            header={<TimeSelector onLoad={setSelectedDate}/>}
            timeSelector={
                <TimeSelectorComponent
                    items={items}
                    selectHour={setSelectedHour}
                    selectedHour={selectedHour}
                />
            }
            message={photos.length === 0 ? (
                <Typography>
                    {message}
                </Typography>
            ) : (
                <PhotosControls
                    selectAll={selectAllValue}
                    editMode={editMode}
                    filters={filters}
                    changeFilters={setFilters}
                    changeEditMode={setEditMode}
                    changeSelectAll={handleSelectAll}
                    handleRemove={handleRemoveMany}
                    handleDownload={handleDownloadMany}
                />
            )}
            body={(photos.length !== 0) && (
                <PhotosPreview
                    onSelect={handleSelectOne}
                    editMode={editMode}
                    selected={selected}
                    photos={shownPhotos}
                    removePhotoById={handleRemove}
                    isLast={selectedHour === ONLINE_INDEX}
                />
            )}
            pagination={(
                <Pagination
                    count={Math.ceil(photosFiltered.length / PaginationData.perPage)}
                    variant="outlined"
                    page={selectedPage}
                    onChange={handleChangePagination}
                />
            )}
        />
    );
};
