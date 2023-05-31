import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { signUpAPI } from "@/services/backend/AuthController";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import AuthPageLayout from "@/layouts/AuthPageLayout";

const signUpFormFields = [
  {
    icon: PrimeIcons.USER,
    placeholder: "Tên",
    name: "fullname",
  },
  {
    icon: PrimeIcons.ENVELOPE,
    placeholder: "Email đăng nhập",
    name: "email",
  },
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

const SinUpPage = ({ providers }: any) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const toastRef = useRef<Toast>(null);

  const onSubmit = async (formData: any) => {
    try {
      const res = await signUpAPI(formData);
    } catch (e: any) {
      const { message, success, statusCode } = e.response.data;
      if (success) {
        router.push("/auth/signin");
        return;
      }
      toastRef.current?.show({
        severity: "error",
        summary: "Đăng kí thất bại",
        detail: message,
        life: 3000,
      });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <AuthPageLayout>
        <div className="font-bold text-2xl self-start">Đăng kí tài khoản</div>
        <form
          className="flex flex-col gap-5 w-[16rem] xs:w-[20rem] sm:w-[30rem]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {signUpFormFields.map(({ icon, name, placeholder }, index) => (
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
          <Button className="rounded-xl !bg-mangahay-700 flex justify-center">
            <div className="flex gap-3 items-center text-white">
              <div className="text-white font-bold">Đăng kí</div>
              <i className={PrimeIcons.USER_PLUS} />
            </div>
          </Button>
        </form>
      </AuthPageLayout>
    </>
  );
};

export default SinUpPage;
