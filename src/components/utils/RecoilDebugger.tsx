import { FC, useEffect } from "react";
import { RecoilValue, useRecoilSnapshot } from "recoil";

const RecoilDebugger: FC = () => {
    const snapshot = useRecoilSnapshot();
    useEffect(() => {
        for (const node of snapshot.getNodes_UNSTABLE({ isModified: true }) as RecoilValue<unknown>[]) {
            console.debug(node.key, snapshot.getLoadable(node).contents);
        }
    }, [snapshot]);
    return null;
};

export default RecoilDebugger;
