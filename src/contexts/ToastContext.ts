import { Toast } from "primereact/toast";
import { Dispatch, RefObject, SetStateAction, createContext } from "react";

export type ReportType = false | "comic" | "comment";

export const ToastContext = createContext<{
  toastRef: RefObject<Toast> | null;
  isReportOpen: ReportType;
  setIsReportOpen: Dispatch<SetStateAction<ReportType>>;
  checkAuth: () => boolean;
}>({
  toastRef: null,
  isReportOpen: false,
  setIsReportOpen: () => {},
  checkAuth: () => false,
});
