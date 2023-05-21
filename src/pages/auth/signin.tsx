import Layout from "@/layouts/Layout";
import Image from "next/image";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { getServerSession } from "next-auth";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import authOptions from "@/lib/nextAuthOptions";
import { GetServerSidePropsContext } from "next";
import axiosClient from "@/services/backend/axiosClient";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

const SignInPage = ({ csrfToken }: { csrfToken: string }) => {
  const { register, handleSubmit } = useForm();
  const route = useRouter();

  const onSubmit = async (formData: any) => {
    const { email, password, csrfToken } = formData;
    signIn("emailLogin", {
      email,
      password,
      csrfToken,
      redirect: true,
      callbackUrl: route.query.callbackUrl as string,
    });
  };

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
          <div className="w-full p-8 flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center gap-5">
              <div className="font-bold text-2xl self-start">
                Đăng nhập để tiếp tục
              </div>
              <form
                className="flex flex-col gap-5 w-[30rem]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  {...register("csrfToken")}
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <span className="p-input-icon-left">
                  <i className={PrimeIcons.ENVELOPE} />
                  <InputText
                    {...register("email")}
                    placeholder="Email đăng nhập"
                    className="w-full"
                    name="email"
                  />
                </span>
                <span className="p-input-icon-left">
                  <i className={PrimeIcons.KEY} />
                  <InputText
                    {...register("password")}
                    placeholder="Mật khẩu"
                    className="w-full"
                    name="password"
                  />
                </span>
                <Button
                  className="rounded-xl !bg-mangahay-700 flex justify-center"
                  type="submit"
                >
                  <div className="flex gap-3 items-center text-white">
                    <div className="text-white font-bold">Đăng nhập</div>
                    <i className={PrimeIcons.SIGN_IN} />
                  </div>
                </Button>
              </form>
              <div className="flex gap-10 font-bold">
                <Link
                  className="cursor-pointer text-mangahay-500"
                  href="/auth/signup"
                >
                  Tạo tài khoản mới
                </Link>
                <div className="cursor-pointer text-mangahay-500">
                  Quên mật khẩu
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SignInPage;

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
