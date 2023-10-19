import { Toaster } from "sonner";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import localFont from "next/font/local";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import Layout from "@/components/Layout";

Router.events.on("routeChangeStart", () => {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const googleReg = localFont({
  src: "../assets/fonts/Google-Sans-Regular.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-google-reg",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout className={googleReg.className}>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
  );
}
