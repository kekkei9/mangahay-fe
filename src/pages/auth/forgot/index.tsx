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
import {
  requestChangePasswordAPI,
  signUpAPI,
} from "@/services/backend/AuthController";
import AuthPageLayout from "@/layouts/AuthPageLayout";
import { useState } from "react";

const ForgotPasswordPage = ({ providers }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [isSent, setIsSent] = useState(false);

  const onSubmit = async (formData: any) => {
    try {
      const res = await requestChangePasswordAPI(formData);

      setIsSent(res.data.success);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthPageLayout>
      <div className="font-bold text-2xl self-start">Quên mật khẩu</div>
      <form
        className="flex flex-col gap-5 w-[30rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="p-input-icon-left">
          <i className={PrimeIcons.ENVELOPE} />
          <InputText
            {...register("email", { required: true })}
            placeholder="Email"
            className={errors?.["email"] && "p-invalid"}
            name="email"
          />
        </span>

        {isSent && (
          <div className="font-semibold text-red-400">
            Email đã được gửi, vui lòng kiểm tra
          </div>
        )}
        <Button className="rounded-xl !bg-mangahay-700 flex justify-center">
          <div className="flex gap-3 items-center text-white">
            <div className="text-white font-bold">Gửi email xác nhận</div>
            <i className={PrimeIcons.ENVELOPE} />
          </div>
        </Button>
      </form>
    </AuthPageLayout>
  );
};

export default ForgotPasswordPage;

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
