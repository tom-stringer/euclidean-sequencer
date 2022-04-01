import { FC } from "react";
import useAddToast from "../hooks/use-add-toast";
import useGetRhythmDTO from "../hooks/use-get-rhythm";
import { Toasts } from "../recoil/toast-state";
import ShareIcon from "./icons/ShareIcon";

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
                navigator.clipboard.writeText(url);
                addToast(Toasts.CLIPBOARD);
            }
        } else {
            navigator.clipboard.writeText(url);
            addToast(Toasts.CLIPBOARD);
        }
    }

    return (
        <button className="flex justify-center items-center group gap-x-2" onClick={() => shareRhythm()}>
            <h1 className="text-muted group-hover:text-muted-light">Share</h1>
            <ShareIcon className="h-5 w-5 stroke-muted group-hover:stroke-muted-light" />
        </button>
    );
};

export default ShareRhythmButton;
