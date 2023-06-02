import NavBar from "@/containers/NavBar";
import { useRouter } from "next/router";
import AuthPageLayout from "../AuthPageLayout";

interface IProps {
  children: any;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      {router.pathname.includes("/comic/[slug]/[chapter]") ? (
        <main>{children}</main>
      ) : router.asPath.includes("auth") ? (
        <AuthPageLayout>
          <main>{children}</main>
        </AuthPageLayout>
      ) : (
        <>
          <NavBar />
          <main
            className={`mt-[3.85rem] xs:mt-[8rem] xl:mt-[4.5rem] ${
              !router.asPath.includes("/auth") && "p-4 xs:p-10"
            }`}
          >
            {children}
          </main>
        </>
      )}
    </>
  );
};

export default MainLayout;
