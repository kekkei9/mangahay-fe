import { Response } from "@/types/Response.type";
import { SWRInfiniteResponse } from "swr/infinite";

export const isEmptySWR = (swr: SWRInfiniteResponse<Response<any[]>, any>) =>
  !swr.data?.[0].result && !swr.isLoading;
