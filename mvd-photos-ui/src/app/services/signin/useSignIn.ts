import {AuthApi, AuthCredentialsDto, Configuration} from 'openapi/src';
import {getToken, saveToken} from 'helpers/auth';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router-dom';
import {getBasePath} from '../basePath';
import {userGroupApi} from '../userGroups/useUserGroupsService';
import {postMiddleware} from '../postMiddleware';
import {useDispatch} from 'react-redux';
import {userGroupsSlice} from '../userGroups';



const authApi = new AuthApi(new Configuration({
    accessToken: getToken,
    basePath: getBasePath()
}));


export const useSignIn = (id = '') => {
    const history = useHistory();
    const dispatch = useDispatch();

    const signin = async (authCredentialsDto: AuthCredentialsDto) => {
        try {
            const {accesstoken} = await authApi.authControllerSignIn({authCredentialsDto});
            saveToken(accesstoken);
            history.push('/');
        } catch (e) {
            const err = await e.json();
            toast.error(err.message);
        }
    };

    const signup = async (authCredentialsDto: AuthCredentialsDto) => {
        let userGroupId = +(id || 0);
        try {
            if (!userGroupId) {
                const userGroup = await userGroupApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .userGroupsControllerCreateUserGroup();
                dispatch(userGroupsSlice.actions.userGroupsAdded(userGroup));
                userGroupId = userGroup.id;
            }
            await authApi.authControllerSignUp({authCredentialsDto, userGroupId});
            toast.success('Користувач успішно доданий');
        } catch (e) {
            toast.error('Помилка! Пароль та логін повинні бути не менш ніж 4 символи кожний.');
            /*
            await userGroupApi
                .withPostMiddleware(postMiddleware(dispatch))
                .userGroupsControllerDeleteUserGroup({userGroupId: userGroupId});
            */
        }
    };

    return {
        signin,
        signup
    };
};
