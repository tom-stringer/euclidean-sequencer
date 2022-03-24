import { atom } from "recoil";

export enum Toasts {
    NONE,
    CLIPBOARD,
}

export const toastState = atom<Toasts>({
    key: "toast",
    default: Toasts.NONE,
});

export const toastCounterState = atom<number>({
    key: "toastCounter",
    default: 0,
});
