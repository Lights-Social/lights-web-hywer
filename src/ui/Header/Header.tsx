
import { store } from '@/data';
import './styles.css';

// import Avatar from "../Avatar";
import FriendsIcon from "@/ui/icons/friends"
import HomeIcon from "@/ui/icons/home"
import Link from "@/ui/utils/crutches/Link"

export function scrollTopFeed() {
	if (location.pathname == "/home") {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
}

function Header() {

    const {strings} = store.locale()
	//const isAuthorized = store.isAuthorized()

	return (
		<header class={"desktop"}>
			<Link class="logo" href='/home' aria-label="Lights">
				<img width="45px" height="45px" src={"/logo.svg"} alt="" />
			</Link>
			{<nav>
				<Link href='/home' aria-label={strings["home"]} onClick={scrollTopFeed}>
					<HomeIcon />
				</Link>

				<Link href='/friends' aria-label={strings["friends"]} onClick={scrollTopFeed}>
					<FriendsIcon />
				</Link>
			</nav>}



			
			<div class="otherButtons">
				{/* {!user ? <button onClick={() => navigate(`/login`, { replace: false })} class="signInButton" aria-label={t("signIn")}>
					{t("signIn")}
				</button> :
				<>
					<button onClick={() => navigate(`/u/${user.username}`, { replace: false })} id="profileAvatar" aria-label="My profile">
						<Avatar avatar={user?.avatar} name={user.name != "" ? user.name : user.username} />
					</button>
				</>
				} */}
			</div>
		</header>
	);
}

export default Header;