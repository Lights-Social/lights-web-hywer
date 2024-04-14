import { type IStatus } from "@/data/types/models";

import "./styles.css";
import Duration from "./Duration";

interface StatusBubbleProps {
    status: IStatus;
}

function StatusBubble(props: StatusBubbleProps) {  

        
    return (
        <div class={props.status.status == "offline" ? "statusBubble" : "statusBubble active"}>
            {
                (props.status.status == "offline" && props.status.last_activity === 0) ?
                    <div class="point" />
                :
                <Duration date={props.status.last_activity} />
            }
        </div>
    );
}

export default StatusBubble;