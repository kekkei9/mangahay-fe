import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { requestChangePasswordAPI } from "@/services/backend/AuthController";
import { useContext, useRef, useState } from "react";
import { ToastContext } from "@/contexts/ToastContext";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSent, setIsSent] = useState(false);
  const [sendInterval, setSendInterval] = useState<number>(0);
  const interValRef = useRef<NodeJS.Timer | null>(null);
  const { toastRef } = useContext(ToastContext);

  const onSubmit = async (formData: any) => {
    try {
      const res = await requestChangePasswordAPI(formData);

      setSendInterval(5000);
      interValRef.current = setInterval(() => {
        setSendInterval((prev) => prev - 1000);
      }, 1000);

      if (res.data.success) {
        setIsSent(true);
        toastRef?.current?.show({
          detail: "Yêu cầu đổi mật khẩu đã được gửi",
          summary: "Yêu cầu đổi mật khẩu",
          severity: "success",
        });
      }
    } catch (e) {
      console.error(e);
      toastRef?.current?.show({
        detail: "Yêu cầu thất bại",
        summary: "Yêu cầu đổi mật khẩu",
        severity: "error",
      });
    }
    return () => {
      if (interValRef.current) clearInterval(interValRef.current);
    };
  };

  return (
    <>
      <div className="font-bold text-2xl self-start">Quên mật khẩu</div>
      <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
        <span className="p-input-icon-left">
          <i className={PrimeIcons.ENVELOPE} />
          <InputText
            {...register("email", {
              required: { message: "Bạn cần nhập email!", value: true },
            })}
            placeholder="Email"
          />
        </span>
        <div className="text-red-500 p-2">
          {errors?.["email"]?.message as string}
        </div>

        {isSent && sendInterval > 0 && (
          <div className="font-semibold text-slate-400 p-2">
            {`Email đã được gửi, vui lòng kiểm tra, bạn có thể yêu cầu lại sau ${
              sendInterval / 1000
            } giây`}
          </div>
        )}
        <Button
          className="rounded-xl !bg-mangahay-700 flex justify-center"
          disabled={sendInterval > 0}
        >
          <div className="flex gap-3 items-center text-white">
            <div className="text-white font-bold">Gửi email xác nhận</div>
            <i className={PrimeIcons.ENVELOPE} />
          </div>
        </Button>
      </form>
    </>
  );
};

export default ForgotPasswordPage;
