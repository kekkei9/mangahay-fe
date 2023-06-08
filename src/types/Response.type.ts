export type Response<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  result?: T;
  total?: number;
};
