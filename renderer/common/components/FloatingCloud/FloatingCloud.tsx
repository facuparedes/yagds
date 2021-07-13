import { motion } from "framer-motion";
import { Cloud48Filled } from "@fluentui/react-icons";
import { cloudFloatingVariant } from "./animationVariants";

export default function FloatingCloud({ className }: { className?: string }) {
  return (
    <motion.div className={`grid self-center ${className}`} variants={cloudFloatingVariant} initial="initial" animate="animate">
      <Cloud48Filled className="text-white self-center justify-self-center scale-500" />
    </motion.div>
  );
}
