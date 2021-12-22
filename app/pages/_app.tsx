import "../styles/globals.css";
import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as gtag from "../utils/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <meta name="og:type" content="website" />
      </Head>
      <div className="p-0 md:p-8">
        <Component {...pageProps} />
        <div className="text-center mt-8">
          &copy; Chris Barna 2021.{" "}
          <a
            href="https://gist.github.com/ctbarna/98b660129b01a5a2c050f3bab78aad70"
            className="underline text-blue-600 hover:text-blue-500"
          >
            Data
          </a>
          .{" "}
          <a
            href="https://github.com/ctbarna/covid-wait-times"
            className="underline text-blue-600 hover:text-blue-500"
          >
            Source code
          </a>
          .
        </div>
      </div>
    </>
  );
}

export default MyApp;
