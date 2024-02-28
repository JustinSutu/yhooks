import {useCallback, useState} from 'react'
import {useIsomorphicEffect} from './useIsomorphicEffect';
import {makeAsync} from '../../utils'

import type {ValueOf} from '../../utils/types'

type IRequestStatus = ValueOf<typeof REQUEST_STATUS>

type IUseAsync = <T>(func: () => Promise<T>, immediate: boolean) => {
    execute: () => Promise<T>,
    status: IRequestStatus,
    error?: Error,
    data?: T,
}

const REQUEST_STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    SUCCESS: 'success',
    ERROR: 'error',
} as const

export const useAsyncExecute: IUseAsync = <T>(func: () => Promise<T>, immedidate = false) => {
    const [response, setResponse] = useState<{ status: IRequestStatus, error?: Error, data?: T }>({
        status: REQUEST_STATUS.IDLE,
    })

    const execute = useCallback(async () => {
        setResponse({...response, status: REQUEST_STATUS.PENDING})

        const [error, data] = (await makeAsync<T>(func())) as [Error, T]

        if (error) {
            setResponse({
                ...response,
                status: REQUEST_STATUS.ERROR,
                error,
                data,
            })
        }
        else {
            setResponse({
                ...response,
                status: REQUEST_STATUS.SUCCESS,
                error,
                data,
            })
        }

        return data
    }, [func])

    useIsomorphicEffect(() => {
        if (immedidate) {
            void execute()
        }
    }, [immedidate, execute])

    return {
        execute,
        ...response,
    }
}