import Layout from "@/layouts/Layout";
import Image from "next/image";

const SignInPage = () => {
  return (
    <div className="bg-gradient-to-tr from-[#e0c3fc] to-[#8ec5fc]">
      <Layout className="h-[calc(100vh-2.5rem)] flex justify-center items-center">
        <div className="rounded-[1.875rem] bg-white overflow-hidden flex flex-col md:flex-row">
          <div className="relative aspect-[5/6] h-[34rem] w-1/2 max-md:hidden">
            <Image
              src="/assets/authpage/demopngs/doraemon.png"
              alt="doraemon.png"
              fill
              className="object-fill"
            />
          </div>
          <div className="w-full p-8 flex flex-col items-center justify-center bg-opacity-70">
            <div className="w-full flex flex-col items-center gap-5">
              <div className="font-bold text-2xl self-start">
                Đăng nhập để tiếp tục
              </div>
              <div className="h-10" />
              <div className="h-10" />
            </div>
            <div className="opacity-60 mt-2">-hoặc-</div>
            <div className="h-10 mt-2" />
            <div className="flex gap-10 font-bold">
              <div className="cursor-pointer text-mangahay-500">
                Tạo tài khoản mới
              </div>
              <div className="cursor-pointer text-mangahay-500">
                Quên mật khẩu
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SignInPage;
