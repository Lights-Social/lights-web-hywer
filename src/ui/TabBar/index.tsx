import FriendsIcon from "@/ui/icons/friends"
import HomeIcon from "@/ui/icons/home"
import { scrollTopFeed } from "@/ui/Header/Header"
import { store } from "@/data"
import './styles.css'
import Link from "@/ui/utils/crutches/Link"

export default function TabBar() {
    
    const {strings} = store.locale()

    return (
        <nav class="tabBar">
            <Link href='/home' aria-label={strings["home"]} onClick={scrollTopFeed}>
                <HomeIcon />
            </Link>

            <Link href='/friends' aria-label={strings["friends"]} onClick={scrollTopFeed}>
                <FriendsIcon />
            </Link>
        </nav>
    )
}