import {get, remove, set} from 'local-storage';


const name = 'ACCESS_TOKEN_MVD_UI';

export const getToken = (): string => {
    return get<string>(name) || '';
};

export const saveToken = (token: string): boolean => {
    return set<string>(name, token);
};

export const resetToken = (): void => {
    return remove(name);
};

export const guestGuard = (): boolean => {
    return !getToken();
};

export const portalGuard = (): boolean => {
    return !!getToken();
};

