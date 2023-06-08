import { useRouter } from "next/router";
import AuthPageLayout from "../AuthPageLayout";
import MainNavBar from "@/containers/NavBar/MainNavBar";
import { ToastContext } from "@/contexts/ToastContext";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { ScrollTop } from "primereact/scrolltop";
interface IProps {
  children: any;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  const router = useRouter();
  const toastRef = useRef<Toast>(null);

  return (
    <ToastContext.Provider value={{ toastRef: toastRef }}>
      <Toast ref={toastRef} />
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
