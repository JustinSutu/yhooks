// 定义表格数据项的类型，根据实际数据结构调整
export interface TableItem {
  key: string;
  [key: string]: any;
}

// 定义fetchFn函数的参数类型
export interface FetchParams {
  current: number;
  pageSize: number;
  [key: string]: any; // 其他查询参数
}

// 定义fetchFn函数的返回值类型
export interface FetchResult {
  list: TableItem[];
  total: number;
}