import "@/styles/globals.css";
import "@/styles/font.css";

//primereact import
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/styles/primeReactTheme.scss";

import MainLayout from "@/layouts/MainLayout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
