import { store } from "@/data"
import type { IPost } from "@/data/types/models"
import FriendsIcon from "@/ui/icons/friends"
import PrivateIcon from "@/ui/icons/private"

interface AccessBadgeProps {
    access: IPost['access']
}
export default function AccessBadge({access}: AccessBadgeProps) {
    const {strings} = store.locale()

    return (
        <>
            {
                access == 'friends' ?
                <div class="accessBadge">
                    <FriendsIcon />
                    {strings["forFriends"]}
                </div> : null
            }

            {
                access == 'private' ?
                <div class="accessBadge">
                    <PrivateIcon />
                    {strings["private"]}
                </div> : null
            }
        
        </>
    )
}