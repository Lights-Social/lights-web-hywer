
import { store } from '@/data';
import './styles.css';

// import Avatar from "../Avatar";
import FriendsIcon from "@/ui/icons/friends"
import HomeIcon from "@/ui/icons/home"
import { Link, NavLink, navigateTo } from "hywer/x/router"
import AvatarPlaceholder from '@/ui/AvatarPlaceholder/AvatarPlaceholder';
import Picture from '@/ui/Picture';


export async function scrollTopFeed() {
	if (location.pathname == "/home") {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
}

function Header() {

    const {strings} = store.locale()
	const user_id = store.auth.user_id()
	//const user = store.getProfileById(user_id!)!.get()


	return (
		<header class={"desktop"}>
			<Link class="logo" path='/home' aria-label="Lights">
				<img width="45px" height="45px" src={"/logo.svg"} alt="" />
			</Link>
			{<nav>
				<NavLink id="homeButton" activeClass='selected' path='/home' aria-label={strings["home"]} onClick={scrollTopFeed}>
					<HomeIcon />
				</NavLink>

				<NavLink id="friendsButton" activeClass='selected' path='/friends' aria-label={strings["friends"]}>
					<FriendsIcon />
				</NavLink>
			</nav>}



			
			{/* <div class="otherButtons">
				{!user_id ? <button onClick={() => navigateTo(`/login`, { replace: false })} class="signInButton" aria-label={strings["signIn"]}>
					{strings["signIn"]}
				</button> :
				<>
					<button onClick={() => navigateTo(`/u/${user.val.username}`, { replace: false })} id="profileAvatar" aria-label="My profile">						
						<div class="avatarWrapper">
							{
								user.val.avatar.length > 0 ?
								<div class="avatar">
									<Picture src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${user.val.avatar[0].id}.webp`} picture={{type: 'photo', id: user.val.avatar[0].id, alt: "", blurhash: user.val.avatar[0].blurhash, width: 1, height: 1}} />
								</div> : <AvatarPlaceholder name={user.val.name != "" ? user.val.name : user.val.username} />
							}
						</div>
					</button>
				</>
				}
			</div> */}
		</header>
	);
}

export default Header;