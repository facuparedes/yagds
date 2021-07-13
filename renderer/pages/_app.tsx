import type { AppProps } from "next/app";
import Titlebar from "../common/components/Titlebar/Titlebar";
import "react-notifications-component/dist/theme.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <Titlebar />
      <div className="h-windowWithoutTitlebar mt-titlebar relative">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
