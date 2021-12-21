import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="p-8">
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
  );
}

export default MyApp;
