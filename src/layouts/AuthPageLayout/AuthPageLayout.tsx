import { PrimeIcons } from "primereact/api";
import Layout from "../Layout";
import Image from "next/image";
import { useRouter } from "next/router";

interface IAuthPageLayoutProps {
  children: React.ReactNode;
}

const AuthPageLayout = ({ children }: IAuthPageLayoutProps) => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-tr from-[#e0c3fc] to-[#8ec5fc]">
      <Layout className="h-[calc(100vh-2.5rem)] flex justify-center items-center">
        <div className="rounded-[1.875rem] bg-white bg-opacity-70 overflow-hidden flex flex-col md:flex-row">
          <div className="relative aspect-[5/6] h-[28rem] w-1/2 max-md:hidden">
            <Image
              src="/assets/authpage/demopngs/doraemon.png"
              alt="doraemon.png"
              fill
              className="object-fill"
            />
          </div>
          <div className="w-full p-8 flex flex-col items-center justify-center bg-opacity-70">
            <div className="w-full flex flex-col items-center gap-5">
              <i
                className={`${PrimeIcons.ARROW_LEFT} cursor-pointer self-start`}
                onClick={() => router.back()}
              />
              {children}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AuthPageLayout;
