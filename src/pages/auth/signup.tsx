import Layout from "@/layouts/Layout";
import Image from "next/image";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Carousel } from "primereact/carousel";

const SinUpPage = () => {
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
                Đăng kí tài khoản
              </div>
              <form className="flex flex-col gap-5 w-[30rem]">
                <InputText placeholder="Email đăng nhập" />
                <InputText placeholder="Mật khẩu" />
                <InputText placeholder="Mã OTP" />
                <Button className="rounded-xl !bg-mangahay-700 flex justify-center">
                  <div className="font-bold text-white">Đăng kí</div>
                </Button>
              </form>
            </div>
            <div className="opacity-60 mt-2">-hoặc-</div>
            <Button
              className="rounded-xl !my-2"
              label="Đăng nhập bằng google"
              icon={PrimeIcons.GOOGLE}
              outlined
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SinUpPage;
