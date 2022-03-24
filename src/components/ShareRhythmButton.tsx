import { FC } from "react";
import useAddToast from "../hooks/use-add-toast";
import useGetRhythm from "../hooks/use-get-rhythm";
import { Toasts } from "../recoil/toast-state";

const ShareRhythmButton: FC = () => {
    const getRhythm = useGetRhythm();
    const addToast = useAddToast();

    async function shareRhythm() {
        const rhythm = await getRhythm();
        const encodedRhythm = btoa(JSON.stringify(rhythm));
        const url = window.location.href + "share/" + encodedRhythm;

        navigator.clipboard.writeText(url);
        addToast(Toasts.CLIPBOARD);
    }

    return <button onClick={() => shareRhythm()}>Share</button>;
};

export default ShareRhythmButton;
