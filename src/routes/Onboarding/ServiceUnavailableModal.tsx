import { store } from "@/data"
import { Modal, closeModal } from "@/ui/Modal/Modal"

export default function ServiceUnavailableModal() {

    const {strings} = store.locale()

    return (
        <Modal type="modal" id="serviceUnavailableModal">
            <h1>{strings["OopsServiceUnavailable"]} 😅</h1>
            <p>
                {strings["tryAgainLater"]}
            </p>
            <div class="buttons">
                <button class="close" onClick={() => {closeModal("serviceUnavailableModal")}}>OK</button>
            </div>
        </Modal>
    )
}