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
import FriendshipConfirmation from "./FriendshipConfirmation/FriendshipConfirmation";
import FormatText from "@/ui/FormatText";
import type { RecReactiveProxy } from "hywer/x/store";
import { derive } from "hywer/jsx-runtime";


interface ProfileProps {
    profile: RecReactiveProxy<IProfile>;
}

export default function Profile({profile}: ProfileProps) {

    const {strings} = store.locale()
    const isAuthorized = store.auth.isAuthorized()
    const user_id = store.auth.user_id()


    function copyToClipboard() {
        navigator.clipboard.writeText(profile.username.val).then(() => {
            showBubble("copyToClipboard")
        })
    }
    
    return (
        <>
            {/* <Bubble id="copyToClipboard">
                Copied to clipboard!
            </Bubble> */}
            <div class="profile">
                <div class="coverWrapper">
                    <Cover profile={profile}/>
                </div>
                <div class="wrapper">
                    <div class="avatarWrapper">
                        {
                            profile.avatar.derive((val) => {
                                if (val.length > 0) {
                                    return <div class="avatar"><Picture src={val[0].id} picture={{id: val[0].id, alt: "", blurhash: val[0].blurhash, width: 1, height: 1, type: 'photo'}} /></div>
                                } else {
                                    return <AvatarPlaceholder name={derive(([name, username]) => name.val != "" ? name.val : username.val, [profile.name, profile.username])} />
                                }
                            })
                        }
                        <div class="statusBubbleWrapper">
                            {/* <StatusContextBubble status={props.profile.status}/> */}
                            <StatusBubble status={profile.status} />
                        </div>
                    </div>
                    <div class="title" onClick={copyToClipboard}>
                        <div class="name">
                            <div class="text">{derive(([name, username]) => name.val != "" ? name.val : username.val, [profile.name, profile.username])}</div>
                            
                            {profile.verified.derive((val) => val ? <VerifiedIcon /> : <div style="display: none;" />)}
                            {profile.is_premium.derive((val) => val ? <RoseIcon /> : <div style="display: none;" />)}

                        </div>
                        <span class="username">
                            {profile.username.derive((val) => val)}
                        </span>
                    </div>
                    

                    {/* <Buttons profile={profile} /> */}

                    {/* <Show when={props.profile.friends.friendship_state == "confirmation"}>
                        <FriendshipConfirmation onAccept={acceptFriendRequest} onIgnore={ignoreFriendRequest} />
                    </Show> */}

                    {/* {
                        profile.friends.friendship_state == "confirmation" ?
                        <FriendshipConfirmation />
                        : null
                    } */}

                    {/* {
                        profile.about != "" ?
                        <div class="about">
                            <FormatText>
                                {profile.about}
                            </FormatText>
                        </div> : null
                    } */}
                    {/* {
                        isAuthorized && profile.id != user_id ?
                        <div class="note">
                            <h4>{strings["note"]}</h4>
                            <textarea id="noteInput" onChange={(e: Event)  => store.editNote(profile.id, (e.target as HTMLTextAreaElement).value)} placeholder={strings["clickToAddANote"]} maxLength={200}>
                                {profile.note}
                            </textarea>
                        </div> : null
                    } */}
                </div>
            </div>
        </>
    )
}