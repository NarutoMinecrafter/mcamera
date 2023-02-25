import {PhotoSourceEnum} from 'openapi/src';

export const SourceName = {
    [PhotoSourceEnum.BM]: 'До Руху',
    [PhotoSourceEnum.EoM]: 'По закінченню руху',
    [PhotoSourceEnum.MD]: 'Під час руху',
    [PhotoSourceEnum.Sch]: 'По розкладу'
};

export const ONLINE_INDEX = 24;
