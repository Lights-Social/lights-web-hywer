import { openModal } from "@/ui/Modal/Modal";
import MessengerIcon from '@/ui/icons/messenger'
import MapIcon from '@/ui/icons/map'
import MapErrorModal from "@/ui/MapErrorModal";
import MessengerErrorModal from "@/ui/MessengerErrorModal";
import { store } from "@/data";
import FriendshipButton from "./FriendshipButton";
import SettingsIcon from "@/ui/icons/settings";

import type { IProfile } from "@/data/types/models";
import { navigateTo } from "hywer/x/router"
import type { RecReactiveProxy } from "hywer/x/store";
import { derive } from "hywer/jsx-runtime";


interface ButtonsProps {
    profile: RecReactiveProxy<IProfile>
}

export default function Buttons({profile}: ButtonsProps) {
    const isAuthorized = store.auth.isAuthorized()
	const user_id = store.auth.user_id()

    
    return (
        <>
            <MapErrorModal />
            <MessengerErrorModal />
            {isAuthorized ? <div class="buttons">
                {
                    profile.id.derive((val) => {
                        if (val != user_id) {
                           return  <>
                                <button onClick={(e: Event) => {e.stopPropagation(); openModal("messengerErrorModal", [7,7,7,7], false)}}>
                                    <MessengerIcon />
                                </button>
                                <button onClick={(e: Event) => {e.stopPropagation(); openModal("mapErrorModal", [7,7,7,7], false)}}>
                                    <MapIcon />
                                </button>

                                <FriendshipButton user_id={profile.id} friendship_state={profile.friends.friendship_state} />
                            </>
                        } else {
                            return <button onClick={() => navigateTo(`/settings`, { replace: false })}>
                                <SettingsIcon />
                            </button>
                        }
                    })
                }
            </div> : null}
        </>
    )
}