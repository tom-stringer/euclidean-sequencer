import { atom } from "recoil";

export const isDebuggingState = atom<boolean>({
    key: "isDebuggingState",
    default: false,
});
