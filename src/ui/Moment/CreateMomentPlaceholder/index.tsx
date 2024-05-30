import { openModal } from "@/ui/Modal/Modal";
import "./styles.css"
import MomentFilledIcon from "@/ui/icons/momentFilled";
import MomentsErrorModal from "@/ui/MomentsErrorModal";
import { store } from "@/data";
import AvatarPlaceholder from "@/ui/AvatarPlaceholder/AvatarPlaceholder";
import Picture from "@/ui/Picture";

function CreateMomentPlaceHolder() {
    const user_id = store.auth.user_id()

    const {user, state} = store.getProfileById(user_id!)
    const profile = user.get()
        
    return (
        <>
            <MomentsErrorModal />
            <div class="moment create" onClick={() => openModal("momentsErrorModal", [7,7,7,7], false)}>
                <MomentFilledIcon />
                {/* {
                    profile.derive((val) => {
                        if (val.avatar.length > 0) {
                            return <div class="avatar">
                                <Picture src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${val.avatar[0].id}.webp`} picture={{type: 'photo', id: val.avatar[0].id, alt: "", blurhash: val.avatar[0].blurhash, width: 1, height: 1}} />
                            </div>
                        } else {
                            return <AvatarPlaceholder name={val.name != "" ? val.name : val.username} />
                        }
                    })
                } */}
            </div>
        </>
    )
}

export default CreateMomentPlaceHolder;