import { store } from "@/data"
import type { IPost } from "@/data/types/models"
import FriendsIcon from "@/ui/icons/friends"
import PrivateIcon from "@/ui/icons/private"
import type { Reactive } from "hywer/jsx-runtime"

interface AccessBadgeProps {
    access: Reactive<IPost['access']>
}
export default function AccessBadge({access}: AccessBadgeProps) {
    const {strings} = store.locale()

    return (
        <>
            {
                access.derive((val) => {
                    switch (val) {
                        case "friends":
                            return <div class="accessBadge">
                                <FriendsIcon />
                                {strings["forFriends"]}
                            </div>
                        case "private":
                            return <div class="accessBadge">
                                <PrivateIcon />
                                {strings["private"]}
                            </div>
                        default:
                            return <div style="display: none;" />
                    }
                })
            }
        </>
    )
}