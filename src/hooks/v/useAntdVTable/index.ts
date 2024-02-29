import { ref, reactive, watchEffect } from 'vue'
import { FetchParams, FetchResult, TableItem } from './types'

export function useAntdVTable(
  fetchFn: (params: FetchParams) => Promise<FetchResult>,
  options: { defaultPageSize?: number } = {},
) {
  const dataSource = ref<TableItem[]>([])
  const loading = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const pagination = reactive({
    current: 1,
    pageSize: options.defaultPageSize || 10,
    total: 0,
    showSizeChanger: true,
    onChange: (page: number, pageSize: number) => {
      pagination.current = page
      pagination.pageSize = pageSize
    },
  })

  async function fetchData() {
    loading.value = true
    error.value = null
    try {
      const params: FetchParams = {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
      const result = await fetchFn(params)
      dataSource.value = result.list
      pagination.total = result.total
    } catch (err) {
      error.value = err as Error
      console.error('Failed to fetch table data:', err)
    } finally {
      loading.value = false
    }
  }

  // 监听查询参数和分页变化，重新加载数据
  watchEffect(() => {
    fetchData()
  })

  return { dataSource, loading, pagination, error }
}
