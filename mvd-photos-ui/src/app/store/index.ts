import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';
import setupSocket from './socket';


const store = configureStore({
    reducer: rootReducer
});

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const newRootReducer = require('../reducers/rootReducer').default;
        store.replaceReducer(newRootReducer);
    });
}
setupSocket(store.dispatch);

export type AppDispatch = typeof store.dispatch;

export default store;
