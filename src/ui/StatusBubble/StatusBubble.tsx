import { type IStatus } from "@/data/types/models";

import "./styles.css";
import Duration from "./Duration";
import Tooltip from "../Tooltip/Tooltip";
import type { RecReactiveProxy } from "hywer/x/store";

interface StatusBubbleProps {
    status: RecReactiveProxy<IStatus>;
}

function StatusBubble(props: StatusBubbleProps) {  

        
    return (
        <>
            <div class={props.status.status.val == "offline" ? "statusBubble" : "statusBubble active"}>
                {
                    (props.status.status.val == "offline" && props.status.last_activity.val === 0) ?
                        <div class="point" />
                    :
                    <Duration date={props.status.last_activity.val} />
                }
            </div>
            <Tooltip />
        </>
        
    );
}

export default StatusBubble;