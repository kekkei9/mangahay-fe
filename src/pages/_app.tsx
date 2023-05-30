import "@/styles/globals.css";
import "@/styles/font.css";

//primereact import
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/styles/primeReactTheme.scss";

import MainLayout from "@/layouts/MainLayout";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import store from "@/redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SWRConfig } from "swr";
import { fetcher } from "@/utils/common";
import ErrorBoundary from "@/containers/ErrorBoundary";

const authorizedPaths = ["/admin"];

const AppRouter = ({ children }: { children: React.ReactNode }) => {
  const isAuthUser = useSelector(
    (state: any) => state.authentication.isAuthUser
  );

  const router = useRouter();

  useEffect(() => {
    if (!isAuthUser) {
      if (authorizedPaths.some((path) => router.asPath.includes(path))) {
        router.push("/auth/signin");
      }
      return;
    }
    if (router.asPath.includes("/auth")) {
      router.push("/");
    }
  }, [router, isAuthUser]);
  return <>{children}</>;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ErrorBoundary>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: fetcher,
        }}
      >
        <Provider store={store}>
          <AppRouter>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </AppRouter>
        </Provider>
      </SWRConfig>
    </ErrorBoundary>
  );
}
