import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { requestChangePasswordAPI } from "@/services/backend/AuthController";
import AuthPageLayout from "@/layouts/AuthPageLayout";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        className="flex flex-col gap-5 w-[16rem] xs:w-[20rem] sm:w-[30rem]"
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
