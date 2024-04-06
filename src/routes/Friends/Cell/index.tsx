import { store } from "@/data";
import './styles.css'
import type { IProfile } from "@/data/types/models";
import VerifiedIcon from '@/ui/icons/verified'
import MessengerIcon from '@/ui/icons/messenger'
import MapIcon from '@/ui/icons/map'
import CheckmarkIcon from "@/ui/icons/checkmark";
import CloseIcon from "@/ui/icons/close";


interface CellProps {
    item: IProfile;
    //onOpenUser: (username: string) => void;
    type: "outgoing" | "incoming" | "friend" | "search";
    onDelete?: (id: string) => void;
}

export default function Cell(props: CellProps) {
    const locale = store.locale()



    async function sendFriendRequest() {

        if (navigator.vibrate) navigator.vibrate(1)

        props.onDelete && props.onDelete(props.item.id)

        store.addFriend(props.item.id)
	}

    async function cancelFriendRequest() {
        props.onDelete && props.onDelete(props.item.id)

        store.deleteFriend(props.item.id)

	}

    return (
        <>
            <div class="cell">
                <div class="avatarWrapper">
                    {/* <Avatar avatar={props.item.avatar} name={props.item.name != "" ? props.item.name : props.item.username} /> */}
                </div>
                <div class="title">
                    <div class="info">
                        <div class="name">
                            {props.item.name != "" ? props.item.name : props.item.username}
                        </div>
                        
                        { props.item.verified ? <VerifiedIcon /> : null }
                    </div>
                    {
                        props.type == "search" ?
                        <div class="username">
                            {props.item.username}
                        </div> : null
                    }
                </div>
                
                <div class="buttons">
                    {props.type == "friend" ? <>
                        <button>
                            <MessengerIcon />
                        </button>
                        <button>
                            <MapIcon />
                        </button>
                    </> : null}

                    {props.type == "incoming" ? <>
                        <button class="accept" onClick={(e: Event) => {e.stopPropagation(); sendFriendRequest()}}>
                            <CheckmarkIcon />
                        </button>
                        <button onClick={(e: Event) => {e.stopPropagation(); cancelFriendRequest()}}>
                            <CloseIcon />
                        </button>
                    </> : null}
                </div>
            </div>
        </>
    )
}