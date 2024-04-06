import { Modal, closeModal, openModal } from "@/ui/Modal/Modal";
import "./styles.css"
import MomentFilledIcon from "@/ui/icons/momentFilled";
import { store } from "@/data";

function CreateMomentPlaceHolder() {
    const locale = store.locale()

        
    return (
        <>
            <Modal
                aria-labelledby={locale["momentsIsNotAvailable"]}
                aria-describedby={locale["tryAgainLater"]}
                id="momentsErrorModal"
            >
                <h1>{locale["momentsIsNotAvailable"]} 😅</h1>
                <p>
                    {locale["tryAgainLater"]}
                </p>
                <button class="close" onClick={() => closeModal("momentsErrorModal")}>OK</button>
            </Modal>
            <div class="moment create" onClick={() => openModal("momentsErrorModal", true, false)}>
                <MomentFilledIcon />
                {/* {user && <Avatar avatar={user?.avatar} name={user.name != "" ? user.name : user.username}/>} */}
            </div>
        </>
    )
}

export default CreateMomentPlaceHolder;