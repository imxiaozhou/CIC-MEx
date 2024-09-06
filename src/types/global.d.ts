declare interface LabelValue {
  label: string;
  value: string;
}

declare interface SearchCommonParams {
  pageNum: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: 'descend' | 'ascend' | null;
}

declare interface SuccessResponse<ResDataType = any> {
  status: {
    msg: string;
    code: number;
  };
  payload: {
    data: ResDataType;
    total?: number;
  };
}
