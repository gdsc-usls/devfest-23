import { Toaster } from "sonner";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import Layout from "@/components/Layout";

Router.events.on("routeChangeStart", () => {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
  );
}
