import { store } from "@/data"
import { Modal, closeModal } from "./Modal/Modal"

export default function MessengerErrorModal() {

    const {strings} = store.locale()

    return (
        <Modal id="messengerErrorModal">
            <h1>{strings["messagesIsNotAvailable"]} 😅</h1>
            <p>
                {strings["tryAgainLater"]}
            </p>
            <div class="buttons">
                <button class="close" onClick={() => closeModal("messengerErrorModal")}>OK</button>
            </div>
        </Modal>
    )
}