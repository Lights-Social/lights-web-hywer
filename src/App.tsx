import './styles/global.css'
import './styles/fonts.css'
import './styles/colors.css'
import './styles/switcher.css'

import '@/ui/ContextMenu/styles.css'
import '@/ui/ContextMenu/ReactionsBar.css'

import Header from './ui/Header/Header'
import { isIPhone } from "@/ui//utils/crutches/platform"


import { createRouterContext, Router, getParams, Redirect } from "hywer/x/router"

import Home from '@/routes/Home/index'
import User from '@/routes/User/User'
import Messenger from './routes/Messenger/Messenger'
import Friends from '@/routes/Friends/Friends'
import Settings from '@/routes/Settings/Settings'
import AppUpdateModal from './AppUpdateModal'
import TabBar from '@/ui/TabBar'
import OnBoarding from './routes/Onboarding/Onboarding'
import { store } from './data'
//import Redirect from '@/ui/utils/crutches/Redirect'
import {OpenLinkModal} from './ui/OpenLinkModal'
import LogoiPhoneBadge from './ui/LogoiPhoneBadge/LogoiPhoneBadge'
import { ShareFlow } from './ui/ShareFlow/ShareFlow'
import TranslateFlow from './ui/TranslateFlow/TranslateFlow'
import UserNotFoundModal from './routes/User/UserNotFoundModal'
import { MediaViewer } from './ui/MediaViewer/MediaViewer'
import PostView from './routes/Post/Post'


function handleAfterRoute() {
	document.querySelectorAll("header nav a").forEach((elem) => {
		elem.classList.remove("selected")
	})

	document.querySelectorAll(".tabBar a").forEach((elem) => {
		elem.classList.remove("selected")
	})

	switch (location.pathname) {
		case "/home":
			document.querySelector("#homeButton")?.classList.add("selected")
			document.querySelector("#homeButtonMobile")?.classList.add("selected")

			break;
		case "/friends":
			document.querySelector("#friendsButton")?.classList.add("selected")
			document.querySelector("#friendsButtonMobile")?.classList.add("selected")

			break;
		case `/u/${store.getProfileById(store.auth.user_id()!).user.get().username.val}`:
			document.querySelector("#profileButtonMobile")?.classList.add("selected")

			break;
		default:
			break;
	}
}

createRouterContext(
	{
		'/404': () => <Redirect path="/home" />,
		'/': () => <Redirect path="/home" />,
		'/home': () => store.auth.isAuthorized() ? <Home /> : <Redirect path="/login" />,
		'/u/:username': () => <User username={getParams()["username"]} />,
		'/p/:post_id': () => <PostView post_id={getParams()["post_id"]} />,
		'/friends': () => store.auth.isAuthorized() ? <Friends /> : <Redirect path="/login" />,
		'/messenger': () => store.auth.isAuthorized() ? <Messenger /> : <Redirect path="/login" />,
		'/settings': () => store.auth.isAuthorized() ? <Settings /> : <Redirect path="/login" />,
		'/login': () => <OnBoarding />,

	}, () => {}, handleAfterRoute)

function App() {

	return <>
		{isIPhone ? <LogoiPhoneBadge /> : ""}
		<Header />
		<Router />
		<TabBar />
		<AppUpdateModal />
		<OpenLinkModal />
		<ShareFlow />
		<TranslateFlow />
		<UserNotFoundModal />
		<MediaViewer />
	</>
}

export default App
