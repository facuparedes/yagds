import { Variants } from "framer-motion";

export const loadingSpinnerVariant = (<T extends Variants>(variants: T): T => variants)({
  initial: { opacity: 0 },
  animate: { opacity: 1, rotateZ: 360 },
  exit: { opacity: 0 },
  transition: { transition: { opacity: { repeat: 0, bounce: false, ease: "linear" }, rotateZ: { repeat: Infinity, bounce: false, ease: "linear" } } },
});
