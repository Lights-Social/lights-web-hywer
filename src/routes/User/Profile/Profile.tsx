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
import Video from "@/ui/Video/Video";


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
                                    if (val[0].type == 'photo') {
                                        return <div class="avatar">
                                            <Picture src={val[0].id} picture={{id: val[0].id, alt: "", blurhash: val[0].blurhash, width: 1, height: 1, type: 'photo'}} />
                                        </div>
                                    } else {
                                        return <div class="avatar">
                                            <Video
                                                src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/video/${val[0].id}.mp4`}
                                                muted={true}
                                            />
                                        </div>
                                    }
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
                    

                    <Buttons profile={profile} />

                    {/* <Show when={props.profile.friends.friendship_state == "confirmation"}>
                        <FriendshipConfirmation onAccept={acceptFriendRequest} onIgnore={ignoreFriendRequest} />
                    </Show> */}

                    {
                        profile.friends.friendship_state.derive((val) => {
                            if (val == "confirmation") {
                                return <FriendshipConfirmation />
                            } else {
                                return <div style="display: none;" />
                            }
                        })
                    }

                    {
                        profile.about.derive((val) => {
                            if (val != "") {
                                return <div class="about">
                                    <FormatText>
                                        {val}
                                    </FormatText>
                                </div>
                            } else {
                                return <div style="display: none;" />
                            }
                        })
                    }

                    {
                        profile.id.derive((val) => {
                            if (val != user_id && isAuthorized) {
                                return <div class="note">
                                    <h4>{strings["note"]}</h4>
                                    <textarea id="noteInput" onChange={(e: Event)  => store.editNote(val, (e.target as HTMLTextAreaElement).value)} placeholder={strings["clickToAddANote"]} maxLength={200}>
                                        {profile.note.derive((val) => val)}
                                    </textarea>
                                </div>
                            } else {
                                return <div style="display: none;" />
                            }
                        })
                    }
                </div>
            </div>
        </>
    )
}