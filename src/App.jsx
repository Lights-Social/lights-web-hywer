import Home from './routes/Home'
import './styles/global.css'
//import './styles/fonts.css'
import './styles/fonts_new.css'
import './styles/colors.css'
import './styles/switcher.css'

function App() {

	document.documentElement.setAttribute("data-theme", "dark");			

	return <Home />
}

export default App
