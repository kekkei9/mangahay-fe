import NavBar from "@/containers/NavBar";
import { useRouter } from "next/router";

interface IProps {
  children: any;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <NavBar />
      <main
        className={`mt-[4.5rem] xs:mt-[8rem] xl:mt-[4.5rem] ${
          !router.asPath.includes("/auth") && "p-4 xs:p-10"
        }`}
      >
        {children}
      </main>
    </>
  );
};

export default MainLayout;
