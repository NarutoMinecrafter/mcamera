import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {Provider} from 'react-redux';
import history from 'helpers/history';

import store from './app/store';



const render = () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const App = require('./app/app').default;

    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>,
        document.getElementById('root')
    );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./app/app', render);
}

