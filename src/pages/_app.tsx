import "@/styles/globals.css";
import "@/styles/font.css";

//primereact import
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/styles/primeReactTheme.scss";

import MainLayout from "@/layouts/MainLayout";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  );
}
