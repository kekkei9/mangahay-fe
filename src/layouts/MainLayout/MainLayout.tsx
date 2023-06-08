import { useRouter } from "next/router";
import AuthPageLayout from "../AuthPageLayout";
import MainNavBar from "@/containers/NavBar/MainNavBar";
import { ToastContext } from "@/contexts/ToastContext";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { ScrollTop } from "primereact/scrolltop";
import { Dialog } from "primereact/dialog";
import ReportTable from "@/containers/ReportTable/ReportTable";
import { reportItemsMapper } from "@/containers/ReportTable/reportItemsMapper";
interface IProps {
  children: any;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  const router = useRouter();
  const toastRef = useRef<Toast>(null);
  const [isReportOpen, setIsReportOpen] = useState<false | "comment" | "comic">(
    false
  );

  return (
    <ToastContext.Provider
      value={{
        toastRef: toastRef,
        isReportOpen: isReportOpen,
        setIsReportOpen: setIsReportOpen,
      }}
    >
      <Toast ref={toastRef} />

      <Dialog
        onHide={() => setIsReportOpen(false)}
        visible={!!isReportOpen}
        header={<div className="text-2xl font-semibold ml-4">Report</div>}
      >
        <ReportTable
          id={1}
          type={isReportOpen.toString()}
          items={
            reportItemsMapper[isReportOpen as keyof typeof reportItemsMapper]
          }
          onClose={() => setIsReportOpen(false)}
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
