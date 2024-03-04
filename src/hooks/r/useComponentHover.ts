import {useCallback, useState} from 'react';

export const useComponentHover = (): {
    isHover: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
} => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const onMouseEnter = useCallback(() => {
        setIsHover(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setIsHover(false);
    }, []);

    return {isHover, onMouseEnter, onMouseLeave};
};