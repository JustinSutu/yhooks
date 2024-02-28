import {useCallback, useState} from 'react'
import {useIsomorphicEffect} from './useIsomorphicEffect';

type Pagination = [number, number]

export type IUsePagination = (
    pagination?: Pagination,
    request?: (pagination?: Pagination) => void,
) => {
    pagination: Pagination,
    onPaginationChange: (...paginationParams: Pagination) => void,
}

export const usePagination: IUsePagination = (defaultPagination: Pagination = [1, 10], request) => {
    const [pagination, setPaginationParams] = useState<Pagination>(defaultPagination)

    const onPaginationChange = useCallback((pageNum: number, pageSize: number) => {
        setPaginationParams([pageNum, pageSize])
    }, [])

    useIsomorphicEffect(() => {
        if (request) {
            void request(pagination)
        }
    }, [pagination, request])

    return {
        pagination,
        onPaginationChange,
    }
}
