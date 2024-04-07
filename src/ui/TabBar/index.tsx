import FriendsIcon from "@/ui/icons/friends"
import HomeIcon from "@/ui/icons/home"
import { scrollTopFeed } from "@/ui/Header/Header"
import { store } from "@/data"
import './styles.css'

export default function TabBar() {
    
    const {strings} = store.locale()

    return (
        <nav class="tabBar">
            <a onClick={scrollTopFeed} data-route href="/home" aria-label={strings["home"]}>
                <HomeIcon />
            </a>

            <a data-route href="/friends" aria-label={strings["friends"]}>
                <FriendsIcon />
            </a>
        </nav>
    )
}