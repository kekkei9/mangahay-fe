import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { signInAPI } from "@/services/backend/AuthController";
import { useDispatch } from "react-redux";
import { loginStorageHandler } from "@/redux/authentication/authentication.action";
import { setAuthToken } from "@/services/backend/axiosClient";
import { Toast } from "primereact/toast";
import { useContext, useRef } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import { Password } from "primereact/password";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const { toastRef } = useContext(ToastContext);
  const onSubmit = async (formData: any) => {
    try {
      const {
        data: { result },
      } = await signInAPI(formData);
      if (result) {
        setAuthToken(result.access_token);

        dispatch(loginStorageHandler(result) as any);
        if (!router.query.redirectUrl) return;
        router.push(router.query.redirectUrl as string);
      }
    } catch (e: any) {
      toastRef?.current?.show({
        severity: "error",
        summary: "Đăng nhập thất bại",
        detail: e.response.data.message,
      });
    }
  };

  return (
    <>
      <div className="font-bold text-2xl self-start">Đăng nhập để tiếp tục</div>
      <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
        <span className="p-input-icon-left w-full">
          <i className={PrimeIcons.ENVELOPE} />
          <InputText
            {...register("email", {
              required: { message: "Bạn cần nhập email!", value: true },
            })}
            placeholder="Email đăng nhập"
            className="w-full"
          />
        </span>
        <div className="text-red-500 p-2">
          {errors?.["email"]?.message as string}
        </div>
        <Password
          toggleMask
          placeholder="Mật khẩu"
          className="w-full"
          onInput={(e: any) => setValue("password", e.target.value)}
          {...register("password", {
            required: { message: "Bạn cần nhập mật khẩu!", value: true },
          })}
        />
        <div className="text-red-500 p-2">
          {errors?.["password"]?.message as string}
        </div>
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
        <Link className="cursor-pointer text-mangahay-500" href="/auth/signup">
          Tạo tài khoản mới
        </Link>
        <Link
          className="cursor-pointer text-mangahay-500"
          href="/auth/forgot-password"
        >
          Quên mật khẩu
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
