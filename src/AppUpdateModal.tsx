import { store } from "@/data";
import { Modal, closeModal, openModal } from "@/ui/Modal/Modal";
import { registerSW } from 'virtual:pwa-register'


export default function AppUpdateModal () {

    const {strings} = store.locale()

	const updateSW = registerSW({
		onNeedRefresh() { openModal("updateAppModal", [], false) },
		onOfflineReady() { console.log("offline ready") },
	})
	

	return (
		<Modal type="modal" id="updateAppModal">
			<h1>{strings["downloadTheUpdate"]} 📥</h1>
			<p>
				{strings["updateDescription"]}
			</p>
			<div class="buttons">
				<button class="accent" onClick={() => updateSW(true)}>{strings["install"]}</button>
				<button onClick={() => {closeModal("updateAppModal")}}>{strings["notNow"]}</button>
			</div>
		</Modal>
	);
};