import App from './App'
import { store } from './data/index.js'
import '@/ui/theme'



await store.setLocale()

document.getElementById('root')!.append(
	...<>
		<App />
	</>
)