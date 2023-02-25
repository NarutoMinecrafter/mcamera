import {useCallback, useState} from 'react';

export const useModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = useCallback(() => {
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    return {
        showModal,
        handleOpenModal,
        handleCloseModal
    };
};
