import App from './App'
import { store } from './data/index.js'
import '@/ui/theme'
import idbReady from 'safari-14-idb-fix';

document.addEventListener('contextmenu', (e) => {
	e.preventDefault()
})

await store.setLocale()
await idbReady();
if (store.auth.isAuthorized()) {

	await store.init()
}
document.getElementById('root')!.append(
	...<>
		<App />
	</>
)