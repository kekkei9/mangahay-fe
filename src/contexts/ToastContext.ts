import { Toast } from "primereact/toast";
import { Dispatch, RefObject, SetStateAction, createContext } from "react";

export type ReportType = false | { type: "comment"; id: string } | { type: "chapter"; id: string };

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
