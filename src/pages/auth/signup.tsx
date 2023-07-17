import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { signUpAPI } from "@/services/backend/AuthController";
import { useContext } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import { Password } from "primereact/password";

const SinUpPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const { toastRef } = useContext(ToastContext);

  const onSubmit = async (formData: any) => {
    try {
      const result = await signUpAPI(formData);
      toastRef?.current?.show({
        severity: "info",
        summary: "Đăng kí",
        detail: "Đã gửi email xác nhận",
        life: 3000,
      });
      if (result.data.result) {
        router.push("/auth/signin");
        return;
      }
    } catch (e: any) {
      const { message, success } = e.response.data;
      toastRef?.current?.show({
        severity: "error",
        summary: "Đăng kí thất bại",
        detail: message,
        life: 3000,
      });
    }
  };

  return (
    <>
      <div className="font-bold text-2xl self-start">Đăng kí tài khoản</div>
      <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
        <span className="p-input-icon-left">
          <i className={PrimeIcons.USER} />
          <InputText
            {...register("fullname", {
              required: {
                message: "Bạn cần nhập tên!",
                value: true,
              },
            })}
            placeholder="Tên"
            className="w-full"
          />
        </span>
        <div className="text-red-500 p-2">
          {errors?.["fullname"]?.message as string}
        </div>
        <span className="p-input-icon-left">
          <i className={PrimeIcons.ENVELOPE} />
          <InputText
            {...register("email", {
              required: {
                message: "Bạn cần nhập email!",
                value: true,
              },
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

        <Password
          {...register("retypePassword", {
            required: { message: "Bạn cần nhập lại mật khẩu!", value: true },
            validate: (val: string) => {
              if (watch("password") !== val) {
                return "Mật khẩu nhập lại không đúng!";
              }
            },
          })}
          toggleMask
          placeholder="Nhập lại mật khẩu"
          className="w-full"
          onInput={(e: any) => setValue("retypePassword", e.target.value)}
        />
        <div className="text-red-500 p-2">
          {errors?.["retypePassword"]?.message as string}
        </div>
        <Button className="rounded-xl !bg-mangahay-700 flex justify-center">
          <div className="flex gap-3 items-center text-white">
            <div className="text-white font-bold">Đăng kí</div>
            <i className={PrimeIcons.USER_PLUS} />
          </div>
        </Button>
      </form>
    </>
  );
};

export default SinUpPage;
