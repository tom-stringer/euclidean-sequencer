import { useRecoilCallback } from "recoil";
import { toastCounterState, Toasts, toastState } from "../recoil/toast-state";

export default function useAddToast() {
    const addToast = useRecoilCallback(
        ({ set }) =>
            async (toast: Toasts) => {
                set(toastState, toast);
                set(toastCounterState, (value) => value + 1);
            },
        []
    );

    return addToast;
}
