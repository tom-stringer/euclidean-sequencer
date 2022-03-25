import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { toastCounterState, Toasts, toastState } from "../../recoil/toast-state";
import ClipboardToast from "./ClipboardToast";

const ToastContainer: FC = () => {
    const toast = useRecoilValue(toastState);
    const resetToast = useResetRecoilState(toastState);
    const toastCounter = useRecoilValue(toastCounterState);

    useEffect(() => {
        const timeout = setTimeout(() => resetToast(), 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, [toastCounter]);

    const variants = {
        hidden: {
            opacity: 0,
        },
        shown: {
            opacity: 1,
            y: -80,
        },
    };

    return (
        <div className="pointer-events-none fixed top-0 left-0 w-full h-full overflow-hidden text-white">
            <AnimatePresence>
                {toast !== Toasts.NONE && (
                    <motion.div
                        key={toastCounter}
                        className="absolute flex justify-center items-center top-full left-0 w-full z-10"
                        variants={variants}
                        initial="hidden"
                        animate="shown"
                        exit="hidden">
                        {/* Only toast currently in use, so no need to check type. */}
                        <ClipboardToast />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ToastContainer;
