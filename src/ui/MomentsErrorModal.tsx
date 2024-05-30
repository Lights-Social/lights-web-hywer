import { store } from "@/data"
import { Modal, closeModal } from "./Modal/Modal"

export default function MomentsErrorModal() {

    const {strings} = store.locale()

    return (
        <Modal type="modal" id="momentsErrorModal">
            <h1>{strings["momentsIsNotAvailable"]} 😅</h1>
            <p>
                {strings["tryAgainLater"]}
            </p>
            <div class="buttons">
                <button class="accent" onClick={() => closeModal("momentsErrorModal")}>OK</button>
            </div>
        </Modal>
    )
}