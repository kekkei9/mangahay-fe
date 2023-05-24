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
import AuthPageLayout from "@/layouts/AuthPageLayout";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";

const SignInPage = ({ csrfToken }: { csrfToken: string }) => {
  const { register, handleSubmit } = useForm();
  const toastRef = useRef<Toast>(null);
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(router.query).includes("error")) {
      toastRef.current?.show({
        severity: "error",
        summary: "Lỗi đăng nhập",
        detail: "Thông tin đăng nhập không chính xác!",
      });
    }
  }, []);

  const onSubmit = async (formData: any) => {
    const { email, password, csrfToken } = formData;
    signIn("emailLogin", {
      email,
      password,
      csrfToken,
      redirect: true,
      callbackUrl: router.query.callbackUrl as string,
    });
  };

  return (
    <>
      <Toast ref={toastRef} />
      <AuthPageLayout>
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
              {...register("email", { required: true })}
              placeholder="Email đăng nhập"
              className="w-full"
              name="email"
            />
          </span>
          <span className="p-input-icon-left">
            <i className={PrimeIcons.KEY} />
            <InputText
              {...register("password", { required: true })}
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
          <Link
            className="cursor-pointer text-mangahay-500"
            href="/auth/forgot"
          >
            Quên mật khẩu
          </Link>
        </div>
      </AuthPageLayout>
    </>
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
