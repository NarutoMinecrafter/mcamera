import {useCallback, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Location} from 'history';
import {useHistory} from 'react-router';


type ModalState = {
    isModal?: boolean;
    previousLocation?: Location<unknown>;
    meta?: object; // eslint-disable-line
} | undefined

const useModals = () => {

    const location = useLocation();
    const history = useHistory();
    const [previousLocation, setPreviousLocation] = useState(location);

    useEffect(() => {
        if (!location.pathname.includes('modals')) {
            setPreviousLocation(location);
        }
    }, [location.pathname]);

    const goBack = () => {
        if (previousLocation) {
            history.push(previousLocation);
        } else {
            history.push('/');
        }
    };

    const redirectToModal = useCallback((path: string, meta?: object) => { // eslint-disable-line
        const modalState: ModalState = {
            isModal: true,
            previousLocation: previousLocation ? previousLocation : history.location,
            meta
        };
        history.push(`/modals/${path}`, modalState);
    }, [history]);

    return {
        previousLocation,
        location,
        isModal: location.pathname.includes('modals'),
        goBack,
        history,
        redirectToModal
    };
};

export {
    useModals
};
