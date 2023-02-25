import {useCallback, useState} from 'react';

export const useLoadImage = () => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleLoad = useCallback((url: string) => {
        const image = document.createElement('img') as HTMLImageElement;
        image.src = url;
        image.hidden = true;
        document.body.appendChild(image);

        image.addEventListener('load', () => {
            setHeight(image.height);
            setWidth(image.width);
            document.body.removeChild(image);
        });

        image.addEventListener('error', () => {
            document.body.removeChild(image);
        });
    }, []);

    return {
        handleLoad,
        width,
        height
    };
};
