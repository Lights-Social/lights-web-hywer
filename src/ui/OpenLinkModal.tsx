import { store } from "@/data"
import { Modal, closeModal } from "./Modal/Modal"
import { ref } from "hywer"

const link = ref("")

function OpenLinkModal() {

    const {strings} = store.locale()

    return (
        <Modal type="modal" id="openLinkModal">
            <h1>{strings["openLink"]} 🔗</h1>
            <p>
                {strings["doYouWantToOpenLink"]} <a href={link.val} target="_blank">{link.derive((val) => val)}</a>?
            </p>
            <div class="buttons">
                <button class="accent" onClick={() => {window.open(link.val, "_blank"); closeModal("openLinkModal")}}>{strings["open"]}</button>
                <button onClick={() => closeModal("openLinkModal")}>{strings["cancel"]}</button>
            </div>
        </Modal>
    )
}

export {OpenLinkModal, link}