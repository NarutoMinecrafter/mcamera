import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState: {
    wsConnectionStatus: boolean;
} = {
    wsConnectionStatus: true
};

const serverSlice = createSlice({
    name: 'server',
    initialState,
    reducers: {
        updateWsConnectionStatus: (state, action: PayloadAction<boolean>) => {
            state.wsConnectionStatus = action.payload;
        }
    }
});

const {
    updateWsConnectionStatus
} = serverSlice.actions;

export {
    updateWsConnectionStatus
};

export default serverSlice.reducer;
