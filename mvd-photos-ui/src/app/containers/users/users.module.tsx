import React from 'react';

import {UsersController} from './users-table';
import {Switch} from 'react-router';
import {Route} from 'react-router-dom';
import {ModalAddUser} from './addUser';
import {ModalEditUser} from './editUser';

export const UsersModule: React.FC = () => {

    return (
        <>
            <UsersController/>
            <Switch>
                <Route path="/users/add/:userGroupId" component={ModalAddUser}/>
                <Route path="/users/add" component={ModalAddUser}/>
                <Route path="/users/edit/:userId/:userGroupId" component={ModalEditUser}/>
            </Switch>
        </>
    );
};
