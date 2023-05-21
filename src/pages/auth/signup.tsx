import Layout from "@/layouts/Layout";
import Image from "next/image";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { getServerSession } from "next-auth";
import { getCsrfToken, getProviders } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import authOptions from "@/lib/nextAuthOptions";
import axiosClient from "@/services/backend/axiosClient";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const onSubmit = (formData: any) => {
  console.log(formData);
};

const signUpFormFields = [
  {
    icon: PrimeIcons.USER,
    placeholder: "Tên",
    name: "fullname",
  },
  {
    icon: PrimeIcons.ENVELOPE,
    placeholder: "Email đăng nhập",
    name: "email",
  },
  {
    icon: PrimeIcons.KEY,
    placeholder: "Mật khẩu",
    name: "password",
  },
  {
    icon: PrimeIcons.KEY,
    placeholder: "Nhập lại mật khẩu",
    name: "retypePassword",
  },
];

const SinUpPage = ({ providers }: any) => {
  const { register, handleSubmit } = useForm();
  const route = useRouter();

  return (
    <div className="bg-gradient-to-tr from-[#e0c3fc] to-[#8ec5fc]">
      <Layout className="h-[calc(100vh-2.5rem)] flex justify-center items-center">
        <div className="rounded-[1.875rem] bg-white bg-opacity-70 overflow-hidden flex flex-col md:flex-row">
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
              <form
                className="flex flex-col gap-5 w-[30rem]"
                onSubmit={handleSubmit(onSubmit)}
              >
                {signUpFormFields.map(({ icon, name, placeholder }, index) => (
                  <span className="p-input-icon-left" key={index}>
                    <i className={icon} />
                    <InputText
                      {...register(name)}
                      placeholder={placeholder}
                      className="w-full"
                      name={name}
                    />
                  </span>
                ))}
                <Button className="rounded-xl !bg-mangahay-700 flex justify-center">
                  <div className="flex gap-3 items-center text-white">
                    <div className="text-white font-bold">Đăng kí</div>
                    <i className={PrimeIcons.USER_PLUS} />
                  </div>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SinUpPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions(axiosClient)
  );

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: {
      providers: providers ?? [],
      csrfToken: await getCsrfToken(context),
    },
  };
}
