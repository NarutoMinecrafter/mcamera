import {getBasePath} from '../services/basePath';

export const makeFrame = (name: string) => {
    const url = `${getBasePath()}/photos/download/${name}`;
    const ifrm = document.createElement('IFRAME');
    ifrm.setAttribute('style', 'display:none;') ;
    ifrm.setAttribute('src', url) ;
    ifrm.style.width = 0+'px';
    ifrm.style.height = 0+'px';
    document.body.appendChild(ifrm) ;
};
