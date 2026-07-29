export interface CommonRes<ResultType = NonNullable<unknown>> {
  status: number;
  message: string;
  ok: boolean;
  result?: ResultType;
}
