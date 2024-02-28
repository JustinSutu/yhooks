import {useState} from 'react';
import {usePrevious} from './usePrevious';
import {useIsomorphicEffect} from './useIsomorphicEffect';

export const useWhyDidYouUpdate = (name: string, props: Record<string, any>) => {
    const previous = usePrevious(props);
    const [changedProps, setChangedProps] = useState<Record<string, any>>();

    useIsomorphicEffect(() => {
        if (previous) {
            const allKeys = Object.keys({...previous, ...props});
            const deleted: Record<string, any> = {},
                add: Record<string, any> = {},
                changed: Record<string, any> = {};

            allKeys.forEach(key => {
                if (previous.hasOwn(key) && !previous.hasOwn(key)) {
                    deleted[key] = {
                        property: key,
                        from: previous[key],
                    };
                } else if (!previous.hasOwn(key) && previous.hasOwn(key)) {
                    add[key] = {
                        property: key,
                        from: previous[key],
                    };
                } else {
                    changed[key] = {
                        property: key,
                        from: previous[key],
                        to: props[key],
                    };
                }
            });

            setChangedProps(changedProps);
        }
    }, [name, props]);

    return changedProps;
};
