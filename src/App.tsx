import './styles/global.css'
import './styles/fonts.css'
import './styles/colors.css'
import './styles/switcher.css'
import Header from './ui/Header/Header'

import { createRouterContext, Router, navigateTo, getParams } from "hywer/x/router"

import Home from '@/routes/Home/index'
import User from '@/routes/User/index'
import Friends from '@/routes/Friends/Friends'
import Settings from '@/routes/Settings/Settings'


createRouterContext(
	{
		'/404': () => { setTimeout(() => navigateTo('/home')); return <></> },
		'/': () => { setTimeout(() => navigateTo('/home')); return <></> },
		'/home': () => <Home />,
		'/u/:username': () => <User username={getParams()["username"]} />,
		'/friends': () => <Friends />,
		'/settings': () => <Settings />,

	})

function App() {

	return <>
		<Header />
		<Router />
	</>
}

export default App
