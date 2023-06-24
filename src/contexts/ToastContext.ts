import { Toast } from "primereact/toast";
import { Dispatch, RefObject, SetStateAction, createContext } from "react";

export type ReportData = {
  type?: "comment" | "chapter";
  id?: string | number;
};

export const ToastContext = createContext<{
  toastRef: RefObject<Toast> | null;
  reportModalData: ReportData;
  setReportModalData: Dispatch<SetStateAction<ReportData>>;
  checkAuth: () => boolean;
}>({
  toastRef: null,
  reportModalData: {},
  setReportModalData: () => {},
  checkAuth: () => false,
});
