//import AutomaticMediaDownloadSettings from "./AutomaticMediaDownloadSettings";

import { store } from "@/data";
import { MobileHeader } from "@/ui/MobileHeader/MobileHeader";
import { Modal, closeModal, openModal } from "@/ui/Modal/Modal";
import formatBytes from "@/ui/utils/formatBytes";
import { ref } from "hywer/jsx-runtime";

export default function CacheSettings() {
    const {strings} = store.locale()

	const cacheSize = ref(0);


	async function computeCacheSize() {
		const cache = await caches.open('image-cache')
		const keys = await cache.keys()

		let size = 0

		keys.forEach(async (request) => {
			const response = await cache.match(request)

			const blob = await response?.blob()

			size = size + (Number(blob?.size) || 0)

		});

	}


	async function cleanCache() {

		await caches.delete('image-cache')
		cacheSize.val = 0
	}

	computeCacheSize()

    return (
		<div class='window'>
			<MobileHeader>
				<span class="title">{strings["dataAndStorage"]}</span>
			</MobileHeader>

			{/* <AutomaticMediaDownloadSettings /> */}
			{
				cacheSize.derive(size => {
					return <button onClick={() => openModal("clearCacheModal", [7,7,7,7], false)} class="clearCache">
						{strings["clearCache"]}
						<span>{formatBytes(size)}</span>
					</button>
				})
			}
			<Modal type="modal" id="clearCacheModal">
				<h1>{strings["clearCache"]} 🧹</h1>
				<p>
					{strings["clearCacheDescription"]}
				</p>
				<div class="buttons">
					<button class="accent" onClick={() => {cleanCache(); closeModal("clearCacheModal")}}>{strings["clearCache"]}</button>
					<button onClick={() => closeModal("clearCacheModal")}>{strings["cancel"]}</button>
				</div>
			</Modal>
		</div>
    )
}