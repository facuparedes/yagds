import { ipcRenderer } from "electron";
import theme from "../../utils/theme";

export default function LoadingPage() {
  return (
    <div className="w-[28.5714%] grid grid-rows-4 bg-white box-border px-14 py-8 select-none font-poppins">
      <h1 className="text-4xl font-medium self-end">Login</h1>
      <span className="self-center">To use YAGDS, you need to authorize it to upload and sync your files.</span>
      <button
        className="h-fit-content row-start-4 px-10 py-3 rounded-2xl border-2 font-medium text-sm hover:bg-black/5 transition-colors focus:outline-none"
        onClick={() => ipcRenderer.send("openGoogleAuthWindow")}
      >
        <div className="mr-4 inline-grid align-middle">
          <img src="/assets/images/googleLogo.svg" width={theme.width.iconInButton} height={theme.height.iconInButton} />
        </div>
        <span className="leading-textWithIconInButton align-middle">Login with Google</span>
      </button>
    </div>
  );
}
