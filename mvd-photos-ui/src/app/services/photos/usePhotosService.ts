import {Configuration, PhotosApi} from 'openapi/src';
import {getToken} from 'helpers/auth';
import {toast} from 'react-toastify';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {postMiddleware} from '../postMiddleware';
import {getBasePath} from '../basePath';
import {photosSlice} from './photosSliceAdapter';


const photosApi = new PhotosApi(new Configuration({
    accessToken: getToken,
    basePath: getBasePath()
}));

export const usePhotosService = () => {

    const dispatch = useDispatch();

    const getPhotos = useCallback((deviceId: number, start: number, end: number) => {
        const getPhotos = async () => {
            try {
                const photos = await photosApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .photosControllerGetPhotosById({deviceId, start, end});
                dispatch(photosSlice.actions.photosReceived(photos));
                return photos;
            } catch (e) {
                toast.error(e.statusText);
                return undefined;
            }
        };
        return getPhotos();
    }, []);

    const getPhotoByPath = useCallback((imageName: string) => {
        const getPhotoByPath = async () => {
            try {
                await photosApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .photosControllerGetPhotoByPath({imageName});
            } catch (e) {
                toast.error(e.statusText);
            }
        };
        return getPhotoByPath();
    }, []);

    const removePhotoById = useCallback((id: number) => {
        const removePhotoById = async () => {
            try {
                await photosApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .photosControllerRemovePhotoById({id});
                dispatch(photosSlice.actions.photoRemove(id));
                toast.success('Фото успішно видалено');
            } catch (e) {
                toast.error(e.statusText);
            }
        };
        return removePhotoById();
    }, []);

    const removePhotosById = useCallback((ids: number[]) => {
        const removePhotosById = async () => {
            try {
                await photosApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .photosControllerRemovePhotosById({
                        removePhotosDto: {ids}
                    });
                dispatch(photosSlice.actions.photoRemoveMany(ids));
                toast.success('Фото успішно видалені');
            } catch (e) {
                toast.error(e.statusText);
            }
        };
        return removePhotosById();
    }, []);


    const getLastPhoto = useCallback((deviceId: number) => {
        const getLastPhoto = async () => {
            try {
                return await photosApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .photosControllerGetLastPhoto({deviceId});
            } catch (e) {
                toast.error(e.statusText);
                return undefined;
            }
        };
        return getLastPhoto();
    }, []);

    const downloadPhoto = useCallback((imageName: string) => {
        const downloadPhoto = async () => {
            try {
                await photosApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .photosControllerDownloadPhotoByPath({imageName});
            } catch (e) {
                toast.error(e.statusText);
            }
        };
        return downloadPhoto();
    }, []);

    return {
        getPhotos,
        getPhotoByPath,
        removePhotoById,
        getLastPhoto,
        removePhotosById,
        downloadPhoto
    };
};
