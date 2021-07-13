import { Variants } from "framer-motion";

/**
 * 100% = 140% (parent)
 * -> 71.4285% = 100% (parent). Is set if !isOnline
 * -> 42.8571% = 60% (parent) Is set if isOnline && !isAlreadyLogged
 * -> 28.5714% = 40% (parent) (remaining).
 **/
export const cloudPageVariant = (<T extends Variants>(variants: T): T => variants)({
  initial: { width: "71.4285%" },
  animate: { width: "42.8571%" },
  exit: { opacity: 0 },
  transition: { transition: { bounce: false, ease: "linear" } },
});

export const offlineTextVariant = (<T extends Variants>(variants: T): T => variants)({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { transition: { bounce: false, ease: "linear" } },
});
