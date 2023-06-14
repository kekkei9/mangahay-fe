import { useRouter } from "next/router";
import AuthPageLayout from "../AuthPageLayout";
import MainNavBar from "@/containers/NavBar/MainNavBar";
import { ReportData, ToastContext } from "@/contexts/ToastContext";
import { useRef, useState } from "react";
import { Toast, ToastMessage } from "primereact/toast";
import { ScrollTop } from "primereact/scrolltop";
import { Dialog } from "primereact/dialog";
import ReportTable from "@/containers/ReportTable/ReportTable";
import { reportItemsMapper } from "@/containers/ReportTable/reportItemsMapper";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { authErrorToastBody } from "@/containers/Comic/ComicDetail/ComicInfo/ComicInteractPanel/toastBody";
interface IProps {
  children: any;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  const router = useRouter();
  const toastRef = useRef<Toast>(null);
  const [reportModalData, setReportModalData] = useState<ReportData>({});

  const { isAuthUser } = useSelector(
    (state: RootState) => state.authentication
  );

  const checkAuth = () => {
    if (!isAuthUser) {
      toastRef?.current?.show(
        authErrorToastBody(() => router.push("/auth/signin")) as ToastMessage
      );
      return false;
    }
    return true;
  };

  return (
    <ToastContext.Provider
      value={{
        toastRef: toastRef,
        reportModalData: reportModalData,
        setReportModalData: setReportModalData,
        checkAuth: checkAuth,
      }}
    >
      <Toast ref={toastRef} />

      <Dialog
        onHide={() => setReportModalData({})}
        visible={!!reportModalData?.type}
        header={<div className="text-2xl font-semibold ml-4">Report</div>}
      >
        <ReportTable
          items={
            reportItemsMapper[
              reportModalData?.type as keyof typeof reportItemsMapper
            ]
          }
          onClose={() => setReportModalData({})}
        />
      </Dialog>
      {router.pathname === "/comic/[slug]/[chapter]" ? (
        <main>{children}</main>
      ) : (
        <>
          <MainNavBar />
          <main className="mt-[3.85rem] xs:mt-[8rem] xl:mt-[4.5rem]">
            {router.asPath.includes("/auth") ? (
              <AuthPageLayout>{children}</AuthPageLayout>
            ) : (
              <div className="p-4 xs:p-10">
                {children}
                <ScrollTop />
              </div>
            )}
          </main>
        </>
      )}
    </ToastContext.Provider>
  );
};

export default MainLayout;
