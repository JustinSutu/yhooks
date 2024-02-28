import { watchEffect, ref, reactive } from 'vue';

type Pagination = [number, number];

export type IUsePagination = (
  pagination?: Pagination,
  request?: (pagination?: Pagination) => void,
) => {
  pagination: Pagination;
  onPaginationChange: (pageNum: number, pageSize: number) => void;
};

const usePagination: IUsePagination = (defaultPagination = [1, 10], request) => {
  const pagination = ref<Pagination>(defaultPagination);

  const onPaginationChange = (pageNum: number, pageSize: number) => {
    pagination.value = [pageNum, pageSize];
  };

  watchEffect(() => {
    if (request) {
      void request(pagination.value);
    }
  });

  return reactive({
    pagination: pagination.value,
    onPaginationChange,
  });
};
export default usePagination;
