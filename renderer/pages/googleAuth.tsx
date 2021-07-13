import Head from "next/head";
import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingSpinner from "../common/components/LoadingSpinner/LoadingSpinner";

export default function GoogleAuth() {
  const [webviewLoaded, setWebviewLoaded] = useState(false);
  const [authUrl, setAuthUrl] = useState({ url: null, userAgent: null });

  useEffect(() => {
    ipcRenderer.once("getAuthUrl", (_, _authUrl) => setAuthUrl(_authUrl)).send("getAuthUrl");
    return () => void ipcRenderer.removeAllListeners("getAuthUrl");
  }, []);

  useEffect(() => {
    document.querySelector("webview")?.addEventListener("did-finish-load", () => setWebviewLoaded(true));
    return () => document.querySelector("webview")?.removeEventListener("did-finish-load", () => setWebviewLoaded(true));
  }, [authUrl.url]);

  return (
    <>
      <Head>
        <title>YAGDS - Google Auth</title>
      </Head>
      {authUrl.url && <webview src={authUrl.url} className={`h-full ${!webviewLoaded && "hidden"}`} useragent={authUrl.userAgent} />}
      <AnimatePresence>{!webviewLoaded && <LoadingSpinner />}</AnimatePresence>
    </>
  );
}
