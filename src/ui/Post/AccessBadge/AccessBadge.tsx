import { store } from "@/data"
import type { IPost } from "@/data/types/models"
import FriendsIcon from "@/ui/icons/friends"
import PrivateIcon from "@/ui/icons/private"

interface AccessBadgeProps {
    access: IPost['access']
}
export default function AccessBadge({access}: AccessBadgeProps) {
    const locale = store.locale()

    return (
        <>
            {
                access == 'friends' ?
                <div class="accessBadge">
                    <FriendsIcon />
                    {locale["forFriends"]}
                </div> : null
            }

            {
                access == 'private' ?
                <div class="accessBadge">
                    <PrivateIcon />
                    {locale["private"]}
                </div> : null
            }
        
        </>
    )
}