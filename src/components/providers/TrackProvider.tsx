import { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { v4 } from "uuid";
import { createTrack } from "../../factories/track-factory";
import { trackState } from "../../recoil/rhythm-state";
import Track from "../Track";

const TrackProvider: FC = () => {
    const [id, _] = useState(v4());
    const [track, setTrack] = useRecoilState(trackState(id));

    useEffect(() => {
        setTrack(createTrack(id));
    }, []);

    return track ? <Track id={id} /> : <p>Loading</p>;
};

export default TrackProvider;
