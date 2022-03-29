import { FC } from "react";
import useAddToast from "../hooks/use-add-toast";
import useGetRhythmDTO from "../hooks/use-get-rhythm";
import { Toasts } from "../recoil/toast-state";

const ShareRhythmButton: FC = () => {
    const getRhythmDTO = useGetRhythmDTO();
    const addToast = useAddToast();

    async function shareRhythm() {
        const rhythmDTO = await getRhythmDTO();
        const encodedRhythm = btoa(JSON.stringify(rhythmDTO));
        const url = window.location.href + "share/" + encodedRhythm;

        if (navigator.share !== undefined) {
            try {
                await navigator.share({ url });
            } catch (error) {
                console.log("Share defined but error: ", error);
            }
        } else {
            navigator.clipboard.writeText(url);
            addToast(Toasts.CLIPBOARD);
        }
    }

    return <button onClick={() => shareRhythm()}>Share</button>;
};

export default ShareRhythmButton;
