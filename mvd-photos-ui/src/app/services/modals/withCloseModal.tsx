import React, {JSXElementConstructor} from 'react';
import {useModals} from './useModals';

type InjectedProps = {
    onClose: () => void;
};

const withCloseModal = <P extends InjectedProps>(Cmp: JSXElementConstructor<P>) => {
    type InnerProps = Omit<P, keyof InjectedProps>
    const WithCloseModal: React.FC<InnerProps> = (props: InnerProps) => {
        const {goBack} = useModals();
        return <Cmp {...{onClose: goBack} as P} {...props}/>;
    };
    return WithCloseModal;
};

export {
    withCloseModal
};
