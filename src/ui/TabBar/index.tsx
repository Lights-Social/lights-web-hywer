import FriendsIcon from "@/ui/icons/friends"
import HomeIcon from "@/ui/icons/home"
import { scrollTopFeed } from "@/ui/Header/Header"
import { store } from "@/data"
import './styles.css'
import Picture from "@/ui/Picture"
import AvatarPlaceholder from "@/ui/AvatarPlaceholder/AvatarPlaceholder"
import { NavLink } from "hywer/x/router"
import { derive } from "hywer/jsx-runtime"

export default function TabBar() {
    
    const {strings} = store.locale()

    const user_id = store.auth.user_id()
    const {user, state} = store.getProfileById(user_id!)
    const profile = user.get()
    
    return (
        <nav class="tabBar">
            <NavLink id="homeButtonMobile" activeClass='selected' path='/home' aria-label={strings["home"]} onClick={scrollTopFeed}>
                <HomeIcon />
            </NavLink>

            <NavLink id="friendsButtonMobile" activeClass='selected' path='/friends' aria-label={strings["friends"]}>
                <FriendsIcon />
            </NavLink>
            <NavLink class="me" id="profileButtonMobile" activeClass='selected' path={derive(([username]) => `/u/${username.val}`, [profile.username])}>
            {
                profile.avatar.derive((val) => {
                    if (val.length > 0) {
                        return <div class="avatar"><Picture src={val[0].id} picture={{id: val[0].id, alt: "", blurhash: val[0].blurhash, width: 1, height: 1, type: 'photo'}} /></div>
                    } else {
                        return <AvatarPlaceholder name={derive(([name, username]) => name.val != "" ? name.val : username.val, [profile.name, profile.username])} />
                    }
                })
            }
            </NavLink>

            
        </nav>
    )
}