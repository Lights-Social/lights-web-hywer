import { store } from "@/data";
import type { IProfile } from "@/data/types/models";
import VerifiedIcon from '@/ui/icons/verified'
import RoseIcon from '@/ui/icons/rose'
import Buttons from "./Buttons";
import Picture from "@/ui/Picture";
import AvatarPlaceholder from "@/ui/AvatarPlaceholder/AvatarPlaceholder";
import Cover from "./Cover/Cover";


interface ProfileProps {
    profile: IProfile;
}

export default function Profile({profile}: ProfileProps) {

    const {strings} = store.locale()
    
    return (
        <>
            <div class="profile">
                <div class="coverWrapper">
                    <Cover profile={profile}/>
                </div>
                <div class="wrapper">
                    <div class="avatarWrapper">
                        {
                            profile.avatar.length > 0 ?
                            <div class="avatar">
                                <Picture picture={{photo_id: profile.avatar[0].photo_id, alt: "", preview: profile.avatar[0].preview, width: 1, height: 1}} />
                            </div> : <AvatarPlaceholder width={40} height={40} name={profile.name != "" ? profile.name : profile.username} />
                        }
                        <div class="statusBubbleWrapper">
                            {/* <StatusContextBubble status={props.profile.status}/>
                            <StatusBubble status={props.profile.status} /> */}
                        </div>
                    </div>
                    <div class="title" onClick={() => navigator.clipboard.writeText(profile.username)}>
                        <div class="name">
                            <div class="text">{profile.name != "" ? profile.name : profile.username}</div>
                            { profile.verified ? <VerifiedIcon /> : null }
                            { profile.is_premium ? <RoseIcon /> : null }
                        </div>
                        <span class="username">
                            {profile.username}
                        </span>
                    </div>
                    

                    <Buttons />

                    {/* <Show when={props.profile.friends.friendship_state == "confirmation"}>
                        <FriendshipConfirmation onAccept={acceptFriendRequest} onIgnore={ignoreFriendRequest} />
                    </Show> */}

                    {
                        profile.about != "" ?
                        <div class="about">
                            {/* <FormatText> */}
                                {profile.about}
                            {/* </FormatText> */}
                        </div> : null
                    }
                    {/* <Show when={account &&(props.profile.id != account?.id)}>
                        <div class="note">
                            <h4>{locale["note"]}</h4>
                            <textarea value={props.profile.note} ref={noteTextfield} onChange={addNote} placeholder={t("clickToAddANote")} maxLength={200} />
                        </div>
                    </Show> */}
                </div>
            </div>
        </>
    )
}