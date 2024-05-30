import { store } from "@/data";
import './styles.css'
import type { IProfile } from "@/data/types/models";
import VerifiedIcon from '@/ui/icons/verified'
import MessengerIcon from '@/ui/icons/messenger'
import MapIcon from '@/ui/icons/map'
import CheckmarkIcon from "@/ui/icons/checkmark";
import CloseIcon from "@/ui/icons/close";
import Picture from "@/ui/Picture";
import AvatarPlaceholder from "@/ui/AvatarPlaceholder/AvatarPlaceholder";
import { navigateTo } from "hywer/x/router"
import MapErrorModal from "@/ui/MapErrorModal";
import MessengerErrorModal from "@/ui/MessengerErrorModal";
import { openModal } from "@/ui/Modal/Modal";

interface CellProps {
    item: IProfile;
    //onOpenUser: (username: string) => void;
    type: "outgoing" | "incoming" | "friend" | "search";
    onDelete?: (id: string) => void;
}

export default function Cell(props: CellProps) {


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
            <MapErrorModal />
            <MessengerErrorModal />
            <div class="cell" onClick={() => navigateTo(`/u/${props.item.username}`)}>
                <div class="avatarWrapper">
                    {
                        props.item.avatar.length > 0 ?
                        <div class="avatar">
                            <Picture src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${props.item.avatar[0].id}.webp`} picture={{id: props.item.avatar[0].id, alt: "", blurhash: props.item.avatar[0].blurhash, width: 1, height: 1, type: 'photo'}} />
                        </div> : <AvatarPlaceholder name={props.item.name != "" ? props.item.name : props.item.username} />
                    }
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
                        <button onClick={(e: Event) => {e.stopPropagation(); openModal("messengerErrorModal", [7,7,7,7], false)}}>
                            <MessengerIcon />
                        </button>
                        <button onClick={(e: Event) => {e.stopPropagation(); openModal("mapErrorModal", [7,7,7,7], false)}}>
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