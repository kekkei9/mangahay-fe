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
import { changePasswordAPI } from "@/services/backend/AuthController";
import { Password } from "primereact/password";
import AuthPageLayout from "@/layouts/AuthPageLayout";

const changePasswordFormFields = [
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

const ChangePasswordPage = ({ providers }: any) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  console.log(errors);

  const onSubmit = async (formData: any) => {
    try {
      const res = await changePasswordAPI(
        formData.password,
        router.query.token as string
      );

      if (res.data.success) {
        router.push("/auth/signin");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthPageLayout>
      <div className="font-bold text-2xl self-start">Xác nhận đổi mật khẩu</div>
      <form
        className="flex flex-col gap-5 w-[30rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {changePasswordFormFields.map(({ icon, name, placeholder }, index) => (
          <span className="p-input-icon-left" key={index}>
            <i className={icon} />
            <InputText
              {...register(name, {
                required: true,
                validate: (val: string) => {
                  if (name !== "retypePassword") return true;
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              placeholder={placeholder}
              className={errors?.[name] && "p-invalid"}
              name={name}
            />
          </span>
        ))}
        <Button
          className="rounded-xl !bg-mangahay-700 flex justify-center"
          type="submit"
        >
          <div className="flex gap-3 items-center text-white">
            <div className="text-white font-bold">Đổi mật khẩu</div>
            <i className={PrimeIcons.SYNC} />
          </div>
        </Button>
      </form>
    </AuthPageLayout>
  );
};

export default ChangePasswordPage;

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