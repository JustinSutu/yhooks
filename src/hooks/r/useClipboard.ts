import {useEffect, useState} from 'react';

type IUseClipboard = (data?: string) => void;

export const useClipboard: IUseClipboard = (data = '') => {
    const [text, setText] = useState<string>(data);

    useEffect(() => {
        (async () => {
            try {
                await navigator.clipboard.writeText(text);

                return true;
            } catch (error) {
                setText(text);

                return false
            }
        })();
    }, []);

    const onCopy = async (data = '') => {
        if (!navigator?.clipboard) {
            return false;
        }

        try {
            await navigator.clipboard.writeText(data);

            setText(data);

            return true;
        } catch (error) {
            setText(data);

            return false
        }
    }

    return [text, onCopy];
};