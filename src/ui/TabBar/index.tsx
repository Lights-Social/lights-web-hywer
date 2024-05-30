import FriendsIcon from "@/ui/icons/friends"
import HomeIcon from "@/ui/icons/home"
import { scrollTopFeed } from "@/ui/Header/Header"
import { store } from "@/data"
import './styles.css'
import Picture from "@/ui/Picture"
import AvatarPlaceholder from "@/ui/AvatarPlaceholder/AvatarPlaceholder"
import { NavLink } from "hywer/x/router"

export default function TabBar() {
    
    const {strings} = store.locale()

    const user_id = store.auth.user_id()
	//const user = store.getProfileById(user_id!)!.get()

    return (
        <nav class="tabBar">
            <NavLink id="homeButtonMobile" activeClass='selected' path='/home' aria-label={strings["home"]} onClick={scrollTopFeed}>
                <HomeIcon />
            </NavLink>

            <NavLink id="friendsButtonMobile" activeClass='selected' path='/friends' aria-label={strings["friends"]}>
                <FriendsIcon />
            </NavLink>
            {/* <NavLink class="me" id="profileButtonMobile" activeClass='selected' path={`/u/${user.val.username}`}>
                {
                    user.val.avatar.length > 0 ?
                    <div class="avatar">
                        <Picture src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${user.val.avatar[0].id}.webp`} picture={{type: 'photo', id: user.val.avatar[0].id, alt: "", blurhash: user.val.avatar[0].blurhash, width: 1, height: 1}} />
                    </div> : <AvatarPlaceholder name={user.val.name != "" ? user.val.name : user.val.username} />
                }
            </NavLink> */}
        </nav>
    )
}