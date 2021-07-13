import { cloneElement, ReactElement } from "react";
import styles from "./Titlebar.module.css";

export default function Button({ className, title, icon, onClick, disabled }: { className: string; title: string; icon: ReactElement; onClick: () => void; disabled?: boolean }) {
  return (
    <button className={`w-titlebarButtons h-titlebarButtons focus:outline-none transition-colors ${styles.removeDraggable} ${className}`} {...{ title }} {...{ onClick }} {...{ disabled }}>
      {cloneElement(icon, { className: "flex justify-center content-center" })}
    </button>
  );
}
