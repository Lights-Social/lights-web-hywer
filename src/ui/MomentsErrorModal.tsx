import { store } from "@/data"
import { Modal, closeModal } from "./Modal/Modal"

export default function MomentsErrorModal() {

    const {strings} = store.locale()

    return (
        <Modal id="momentsErrorModal">
            <h1>{strings["momentsIsNotAvailable"]} 😅</h1>
            <p>
                {strings["tryAgainLater"]}
            </p>
            <button class="close" onClick={() => closeModal("momentsErrorModal")}>OK</button>
        </Modal>
    )
}