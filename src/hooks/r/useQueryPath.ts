import {useCallback, useMemo} from 'react'
import {useSearchParams} from 'react-router-dom'
import {parseQueryParams, isUndefined} from '../../utils'

export type QueryParams = Record<string | number, any>

export const useQueryPath = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const queryParams = useMemo(() => parseQueryParams(searchParams), [searchParams])

    const onUpdateQueryPath = useCallback(
        (queryParams: QueryParams = {}) => {
            const params = {...parseQueryParams(searchParams), ...queryParams}

            const validSearchParams = Object.keys(params).reduce(
                (queryParams, key) => ({
                    ...queryParams,
                    // @ts-ignore
                    ...(!isUndefined(params[key], 'strict') && {[key]: params[key]}),
                }),
                {},
            )

            setSearchParams(validSearchParams)
        },
        [searchParams, setSearchParams],
    )

    return {
        queryParams,
        onUpdateQueryPath,
    }
}
