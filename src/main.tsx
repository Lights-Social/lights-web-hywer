import App from './App'
import { store } from './data/index.js'
import '@/ui/theme'

document.addEventListener('contextmenu', (e) => {
	e.preventDefault()
})

await store.init()


document.getElementById('root')!.append(
	...<>
		<App />
	</>
)