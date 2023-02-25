import {useHistory} from 'react-router-dom';
import {useUser} from './useUser';

const useAuth = () => {

    const history = useHistory();
    const {isLogged, user} = useUser();

    if (history.location.pathname !== '/signin' && !isLogged) {
        history.push('/signin');
    }

    return {
        isLogged,
        user,
        isAdmin: Boolean(user?.isAdmin)
    };
};

export {
    useAuth
};
