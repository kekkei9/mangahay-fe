import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { changePasswordAPI } from "@/services/backend/AuthController";
import { Password } from "primereact/password";
import { useContext } from "react";
import { ToastContext } from "@/contexts/ToastContext";

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { toastRef } = useContext(ToastContext);

  const onSubmit = async (formData: any) => {
    try {
      const res = await changePasswordAPI(
        formData.password,
        router.query.token as string
      );
      toastRef?.current?.show({
        detail: "Đổi mật khẩu thành công",
        summary: "Đổi mật khẩu",
        severity: "success",
      });

      if (res.data.success) {
        router.push("/auth/signin");
      }
    } catch (e) {
      console.error(e);
      toastRef?.current?.show({
        detail: "Đổi mật khẩu thất bại",
        summary: "Đổi mật khẩu",
        severity: "error",
      });
    }
  };

  return (
    <>
      <div className="font-bold text-2xl self-start">Xác nhận đổi mật khẩu</div>
      <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
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
    </>
  );
};

export default ChangePasswordPage;
