# useAntdVTable

### 简化实现 antd-v Table组件的 Hook。已实现常规的 Table Form 与 分页器 合并调用的hook

```ts
<template>
    <a-table :data-source="dataSource" :pagination="pagination" :columns="columns"></a-table>
</template>

<script setup lang="ts">
import { useAntdVTable } from '@/hooks/useAntdVTable/index'

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
    width: '100px',
  },
  {
    title: 'age',
    dataIndex: 'age',
    key: 'age',
    width: '100px',
  },
]
const { dataSource, loading, pagination, error, queryParams } = useAntdVTable(() => {
  return {
    list: [
      {
        key: '1',
        name: '1',
        age: 2
      },
      {
        key: '1',
        name: '2',
        age: 2
      },
    ],
    total: 20,
  }
})
</script>

<style scoped></style>
```

### result API

| 参数    | 说明     | 类型      |
| ------- | -------- | --------- |
| dataSource | 表格数据 | `TableItem[]` |
| loading | 远程获取数据 loading状态 | `boolean` | 
| pagination | 页面数据 | `Pagination` | 
| error | 接口调用错误信息 | `Error` | 


### query API
|参数 |说明 |是否必填 |默认值 |
| request | 远程调用接口 | 是 | - |
| options | 配置信息 | 否 | `{defaultPageSize: 10}` |




