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
import { useRef } from "react";

const SignInPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const toastRef = useRef<Toast>(null);

  const onSubmit = async (formData: any) => {
    try {
      const {
        data: { result },
      } = await signInAPI(formData);
      if (result) {
        setAuthToken(result.access_token);

        dispatch(loginStorageHandler(result) as any);
      }
    } catch (e: any) {
      toastRef.current?.show({
        severity: "error",
        summary: "Đăng nhập thất bại",
        detail: e.response.data.message,
      });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <div className="font-bold text-2xl self-start">Đăng nhập để tiếp tục</div>
      <form
        className="flex flex-col gap-5 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
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
