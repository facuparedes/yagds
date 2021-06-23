import React from "react";
import type { AppProps } from "next/app";
import Titlebar from "../common/components/titlebar/Titlebar";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Titlebar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
