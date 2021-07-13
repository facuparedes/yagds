import { motion } from "framer-motion";
import { loadingSpinnerVariant } from "./animationVariants";

export default function LoadingSpinner() {
  return (
    <motion.div
      className="w-8 h-8 rounded-full border-4 border-custom-first/5 border-t-custom-accent absolute inset-0 m-auto"
      variants={loadingSpinnerVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={loadingSpinnerVariant.transition.transition}
    />
  );
}
