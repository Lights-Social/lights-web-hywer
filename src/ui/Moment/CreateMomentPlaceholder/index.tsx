import { openModal } from "@/ui/Modal/Modal";
import "./styles.css"
import MomentFilledIcon from "@/ui/icons/momentFilled";
import MomentsErrorModal from "@/ui/MomentsErrorModal";

function CreateMomentPlaceHolder() {
        
    return (
        <>
            <MomentsErrorModal />
            <div class="moment create" onClick={() => openModal("momentsErrorModal", true, false)}>
                <MomentFilledIcon />
                {/* {user && <Avatar avatar={user?.avatar} name={user.name != "" ? user.name : user.username}/>} */}
            </div>
        </>
    )
}

export default CreateMomentPlaceHolder;