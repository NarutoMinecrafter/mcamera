import {
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import {Photo} from 'openapi/src';
import {RootState} from '../../reducers/rootReducer';


const photosAdapter = createEntityAdapter<Photo>();

const photosSlice = createSlice({
    name: 'photos',
    initialState: photosAdapter.getInitialState(),
    reducers: {
        photosReceived: photosAdapter.setAll,
        photosRemove: photosAdapter.removeAll,
        photoRemove: photosAdapter.removeOne,
        photoRemoveMany: photosAdapter.removeMany,
        photoUpdateOne: photosAdapter.updateOne
    }
});

const photosSelectors = photosAdapter.getSelectors<RootState>(
    (state) => state.photos
);

export {
    photosSlice,
    photosSelectors
};

export default photosSlice.reducer;
