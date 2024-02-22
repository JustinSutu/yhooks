import type { QueryParams } from '../hooks'

const makeQueryParams = (params: QueryParams, key: string, value: string): QueryParams => {
  if (key !== '') {
    return {
      ...params,
      ...{
        [key]: !params[key] ? value : Array.isArray(params[key]) ? [...params[key], value] : [params[key], value],
      },
    }
  }

  return params
}
export const parseQueryParams = (query?: string | URLSearchParams): QueryParams => {
  if (query instanceof URLSearchParams) {
    // @ts-ignore
    return [...query.entries()].reduce<QueryParams>((params, [key, value]) => {
      return makeQueryParams(params, key, value)
    }, {})
  }

  if (typeof query === 'string') {
    return query
      .replace(/^\?/, '') /* 去除问号 */
      .split('&')
      .reduce<QueryParams>((params, pair) => {
        const [key, value] = pair.split('=')

        return makeQueryParams(params, decodeURIComponent(key), decodeURIComponent(value || ''))
      }, {})
  }

  return {}
}
