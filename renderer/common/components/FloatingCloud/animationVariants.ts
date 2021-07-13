import { Variants } from "framer-motion";

export const cloudFloatingVariant = (<T extends Variants>(variants: T): T => variants)({
  initial: { y: "-20px" },
  animate: { y: "20px", transition: { repeat: Infinity, repeatType: "reverse", duration: 8 } },
});
