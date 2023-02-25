import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NotAuthedModal from './not-auth-modal/NotAuthedModal';

const Modals: React.FC = () => (
    <Switch>
        <Route path="/modals/notAllowed" component={NotAuthedModal}/>
    </Switch>
);

export default Modals;
