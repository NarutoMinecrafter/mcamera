import {TextMapper} from './types';
import {PermissionType} from '../../../hooks/useRestrictions/types';

export const PermissionsTextMapper: Record<PermissionType, TextMapper> = {
    editDevice: {
        title: 'Редагувати Пристрої',
        description: 'Редагувати Пристрої'
    },
    addDevice: {
        title: 'Додавати пристрої',
        description: 'Додавати пристрої'
    },
    removeDevice: {
        title: 'Видаляти пристрої',
        description: 'Видаляти пристрої'
    },
    removePhoto: {
        title: 'Видаляти фото',
        description: 'Видаляти фото'
    },
    download: {
        title: 'Вигружати фото',
        description: 'Вигружати фото'
    }
};

export const PermissionsValues = [
    'addDevice',
    'removeDevice',
    'editDevice',
    'download',
    'removePhoto'
] as const;
