import { AnimatePresence, motion } from "framer-motion";
import { cloudPageVariant, offlineTextVariant } from "./animationVariants";
import FloatingCloud from "../../FloatingCloud/FloatingCloud";
import LoginColumn from "../../LoginColumn/LoginColumn";

export default function LoadingOfflineAndLogin({
  previousIsOnline,
  isOnline,
  retryingCountdown,
  isLoggedIn,
}: {
  previousIsOnline: boolean;
  isOnline: boolean;
  retryingCountdown: number;
  isLoggedIn: boolean;
}) {
  return (
    <AnimatePresence>
      {(!isOnline || (isOnline && !isLoggedIn)) && (
        <div className="w-[140%] h-full flex absolute inset-0">
          <motion.div
            className="grid grid-rows-3 items-center justify-center bg-custom-accent select-none"
            variants={cloudPageVariant}
            initial={isOnline === null || (!isOnline && previousIsOnline === null) || (isOnline && isLoggedIn === false) ? "initial" : "animate"}
            animate={isOnline && isLoggedIn === false ? "animate" : "initial"}
            // initial={isOnline === null ? "initial" : !isOnline && previousIsOnline === null ? "initial" : !isOnline ? "animate" : isLoggedIn === false ? "initial" : "animate"}
            // animate={isOnline === null ? false : !isOnline && previousIsOnline === null ? false : !isOnline ? "initial" : isLoggedIn === false ? "animate" : "initial"}
            exit="exit"
            transition={cloudPageVariant.transition.transition}
            key={`anim-key-${isOnline}`}
          >
            <FloatingCloud className="row-start-2" />
            <AnimatePresence>
              {isOnline === false && (
                <motion.span className="row-start-3 text-xl font-bold text-white/25" variants={offlineTextVariant} initial="initial" animate="animate" transition={offlineTextVariant.transition}>
                  You're currently offline. Retrying in.. {retryingCountdown}s
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
          {isOnline && <LoginColumn />}
        </div>
      )}
    </AnimatePresence>
  );
}
