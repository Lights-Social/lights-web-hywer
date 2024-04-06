
import { store } from '@/data';
import './styles.css';

// import Avatar from "../Avatar";
import FriendsIcon from "@/ui/icons/friends"
import HomeIcon from "@/ui/icons/home"


function Header() {

    const locale = store.locale()


	function scrollTopFeed() {

		if (location.pathname == "/home") {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}
	}


	return (
		<header class={localStorage.getItem("blurEnabled") == "true" ? "desktop blur" : "desktop"}>
			<a data-route class="logo" href="/home" aria-label="Lights">
				<img width="45px" height="45px" src={"/logo.svg"} alt="" />
			</a>
			{<nav>
				<a onClick={scrollTopFeed} data-route href="/home" aria-label={locale["home"]}>
					<HomeIcon />
				</a>

				<a data-route href="/friends" aria-label={locale["friends"]}>
					<FriendsIcon />
				</a>
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