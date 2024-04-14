import { navigateTo } from "hywer/x/router"


export default function Redirect({ url }: { url: string }) {
	setTimeout(() => navigateTo(url))

	return <></>
}