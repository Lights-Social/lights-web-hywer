import { store } from "@/data";
import type { IProfile } from "@/data/types/models";
import VerifiedIcon from '@/ui/icons/verified'
import RoseIcon from '@/ui/icons/rose'
import Buttons from "./Buttons";
import Picture from "@/ui/Picture";
import AvatarPlaceholder from "@/ui/AvatarPlaceholder/AvatarPlaceholder";
import Cover from "./Cover/Cover";
import showBubble, { Bubble } from "@/ui/Bubble/Bubble";
import StatusBubble from "@/ui/StatusBubble/StatusBubble";


interface ProfileProps {
    profile: IProfile;
}

export default function Profile({profile}: ProfileProps) {

    const {strings} = store.locale()
    const isAuthorized = store.auth.isAuthorized()

    function copyToClipboard() {
        navigator.clipboard.writeText(profile.username).then(() => {
            showBubble("copyToClipboard")
        })
    }

    console.log(typeof profile.note)
    
    return (
        <>
            <Bubble id="copyToClipboard">
                Copied to clipboard!
            </Bubble>
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
                            </div> : <AvatarPlaceholder name={profile.name != "" ? profile.name : profile.username} />
                        }
                        <div class="statusBubbleWrapper">
                            {/* <StatusContextBubble status={props.profile.status}/>
                            <StatusBubble status={props.profile.status} /> */}
                            <StatusBubble status={profile.status} />
                        </div>
                    </div>
                    <div class="title" onClick={copyToClipboard}>
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
                    {
                        isAuthorized ?
                        <div class="note">
                            <h4>{strings["note"]}</h4>
                            <textarea id="noteInput" onChange={(e: Event)  => store.editNote(profile.id, (e.target as HTMLTextAreaElement).value)} placeholder={strings["clickToAddANote"]} maxLength={200}>
                                {profile.note}
                            </textarea>
                        </div> : null
                    }
                </div>
            </div>
        </>
    )
}