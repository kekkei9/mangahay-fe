import { AppProvider } from "next-auth/providers";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "primereact/button";

interface ISignInWithProvidersProps {
  providers: AppProvider[];
}

const SignInWithProviders = ({ providers }: ISignInWithProvidersProps) => {
  return (
    <>
      <div className="opacity-60 -my-3">-hoặc-</div>
      {providers.map((provider) => {
        return (
          <Button
            key={provider?.name}
            className="flex justify-center items-center !bg-white !border-none w-full"
            onClick={() => signIn(provider.id)}
          >
            <div className="relative w-6 aspect-square">
              <Image
                src={`/assets/providers/${provider.id}.png`}
                alt={provider.id}
                fill
                className="object-contain"
              />
            </div>
            <div className="font-bold ml-4">Đăng nhập bằng {provider.name}</div>
          </Button>
        );
      })}
    </>
  );
};

export default SignInWithProviders;
