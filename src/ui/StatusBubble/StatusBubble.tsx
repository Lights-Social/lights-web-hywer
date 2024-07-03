import { type IStatus } from "@/data/types/models";

import "./styles.css";
import Duration from "./Duration";
import Tooltip from "../Tooltip/Tooltip";
import type { RecReactiveProxy } from "hywer/x/store";
import { derive } from "hywer/jsx-runtime";

interface StatusBubbleProps {
    status: RecReactiveProxy<IStatus>;
}

function StatusBubble(props: StatusBubbleProps) {  

        
    return (
        <>
            <div class={props.status.status.derive((val) => {return val == "offline" ? "statusBubble" : "statusBubble active"})}>
                <div class="point" />
                {
                    derive(([status, last_activity]) => {
                        if (!(status.val == "offline" && last_activity.val === 0)) {
                            return <Duration date={props.status.last_activity.val} />
                        } else {
                            return <div style="display: none;" />
                        }
                    }, [props.status.status, props.status.last_activity])
                }
            </div>
            <Tooltip />
        </>
        
    );
}

export default StatusBubble;