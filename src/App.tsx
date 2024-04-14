import './styles/global.css'
import './styles/fonts.css'
import './styles/colors.css'
import './styles/switcher.css'
import Header from './ui/Header/Header'

import { createRouterContext, Router, getParams } from "hywer/x/router"

import Home from '@/routes/Home/index'
import User from '@/routes/User/User'
import Friends from '@/routes/Friends/Friends'
import Settings from '@/routes/Settings/Settings'
import AppUpdateModal from './AppUpdateModal'
import TabBar from '@/ui/TabBar'
import OnBoarding from './routes/Onboarding/Onboarding'
import { store } from './data'
import Redirect from '@/ui/utils/crutches/Redirect'

createRouterContext(
	{
		'/404': () => <Redirect url="/home" />,
		'/': () => <Redirect url="/home" />,
		'/home': () => store.auth.isAuthorized() ? <Home /> : <Redirect url="/login" />,
		'/u/:username': () => <User username={getParams()["username"]} />,
		'/friends': () => store.auth.isAuthorized() ? <Friends /> : <Redirect url="/login" />,
		'/settings': () => store.auth.isAuthorized() ? <Settings /> : <Redirect url="/login" />,
		'/login': () => <OnBoarding />,

	})

function App() {

	return <>
		<Header />
		<Router />
		<TabBar />
		<AppUpdateModal />
	</>
}

export default App
