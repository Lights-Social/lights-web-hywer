import Avatar from "../../../../../components/Avatar";
import { IProfile } from "../../../../../types/models"

import "./styles.css"

interface CellProps {
    profile: IProfile;
}

export default function Cell(props: CellProps) {
    return (
        <div class="cell">
            <Avatar avatar={props.profile.avatar} name={props.profile.name != "" ? props.profile.name : props.profile.username} />
            <span class="name">{props.profile.name != "" ? props.profile.name : props.profile.username}</span>
        </div>
    )
}