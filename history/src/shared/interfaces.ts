export interface PaginationResRO<T> extends CommonResRO<T> {
  current: number;
  size: number;
  total: number;
  pages: number;
}

export interface PaginationReqRO {
  current: number;
  size: number;
  [k: string]: any;
};

export interface CommonResRO<T> {
  code: number;
  data: T[];
  msg: string | null;
}
