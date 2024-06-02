import { openModal } from "@/ui/Modal/Modal";
import "./styles.css"
import MomentFilledIcon from "@/ui/icons/momentFilled";
import MomentsErrorModal from "@/ui/MomentsErrorModal";
import { store } from "@/data";
import AvatarPlaceholder from "@/ui/AvatarPlaceholder/AvatarPlaceholder";
import Picture from "@/ui/Picture";
import { derive } from "hywer/jsx-runtime";

function CreateMomentPlaceHolder() {
    const user_id = store.auth.user_id()

    const {user, state} = store.getProfileById(user_id!)
    const profile = user.get()
        
    return (
        <>
            <MomentsErrorModal />
            <div class="moment create" onClick={() => openModal("momentsErrorModal", [7,7,7,7], false)}>
                <MomentFilledIcon />
                {
                    profile.avatar.derive((val) => {
                        if (val.length > 0) {
                            return <div class="avatar"><Picture src={val[0].id} picture={{id: val[0].id, alt: "", blurhash: val[0].blurhash, width: 1, height: 1, type: 'photo'}} /></div>
                        } else {
                            return <AvatarPlaceholder name={derive(([name, username]) => name.val != "" ? name.val : username.val, [profile.name, profile.username])} />
                        }
                    })
                }
            </div>
        </>
    )
}

export default CreateMomentPlaceHolder;