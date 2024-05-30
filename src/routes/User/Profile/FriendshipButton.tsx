import { store } from "@/data";
import type { IProfile } from "@/data/types/models";
import shake from "@/ui/shake";
import { ref } from "hywer/jsx-runtime";

import Friendship_friendsIcon from "@/ui/icons/friendship_friends";
import Friendship_pendingIcon from "@/ui/icons/friendship_pending";
import Friendship_notFriendsIcon from "@/ui/icons/friendship_notFriends";


interface FriendshipButtonProps {
    friendship_state: IProfile['friends']['friendship_state'];
    user_id: IProfile['id'];
}

export default function FriendshipButton(props: FriendshipButtonProps) {

    const friendship_state = ref<IProfile['friends']['friendship_state']>(props.friendship_state);

    async function sendFriendRequest() {
        const button = document.querySelector<HTMLButtonElement>(".friendshipButton")

        if (navigator.vibrate) navigator.vibrate(1)

        if (button) button.className = "friendshipButton pending";
        friendship_state.val = "pending";

        const response = await store.addFriend(props.user_id)

        if (!response) {
            if (button) button.className = "friendshipButton notFriends";
            friendship_state.val = "notFriends";

        }
        
	}

    async function triggerFriendshipConfirmation() {
        const friendshipConfirmation = document.querySelector(".friendshipConfirmation") as HTMLDivElement

        shake(friendshipConfirmation)
    }

    async function cancelFriendRequest() {
        const button = document.querySelector<HTMLButtonElement>(".friendshipButton")


        if (button) button.className = "friendshipButton notFriends";
        friendship_state.val = "notFriends";

        const response = await store.deleteFriend(props.user_id)

        if (!response) {
            if (button) button.className = "friendshipButton pending";
            friendship_state.val = "pending";
        }
	}

    async function friendshipHandler() {

        switch (friendship_state.val) {
            case "notFriends":
                sendFriendRequest();
                break;
            case "pending":
                cancelFriendRequest();
                break;
            case "confirmation":
                triggerFriendshipConfirmation();
                break;
			case "friends":
				cancelFriendRequest();
				break;
            default:
                break;
        }
    }

    return (
        <>
            <button class={"friendshipButton "+friendship_state.val} onClick={friendshipHandler}>
                {
                    friendship_state.derive((val) => {
                        switch (val) {
                            case "friends":
                                return <Friendship_friendsIcon />
                            case "notFriends":
                                return <Friendship_notFriendsIcon />
                            case "pending":
                                return <Friendship_pendingIcon />
							case "confirmation":
								return <Friendship_pendingIcon />
                            default:
                                break;
                        }
                    })
                }
            </button>
        </>
    )
}