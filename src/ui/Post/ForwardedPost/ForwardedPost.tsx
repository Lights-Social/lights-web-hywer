//import { IPost, IProfile } from "../../../types/models";
//import FormatText from "../../FormatText";
//import Duration from "../Duration";
import "./styles.css"
//import Avatar from "../../Avatar";
// import Pictures from "../Pictures";
import type { IPost, IProfile } from "@/data/types/models";
import VerifiedIcon from '@/ui/icons/verified'
import EditedIcon from "@/ui/icons/edited"
import Media from "../Media/Media";
import Picture from "@/ui/Picture";
import AvatarPlaceholder from "@/ui/AvatarPlaceholder/AvatarPlaceholder";
import Duration from "../Duration";
import { store } from "@/data";
import FormatText from "@/ui/FormatText";

interface ForwardedPostProps {
    item: IPost
}

export default function ForwardedPost({ item }: ForwardedPostProps) {
    //const user = store.getProfileById(item.peer.id)!

    //const profile = user.get()

    return (
        <div onDblClick={(e: Event) => e.stopPropagation()} class="forwardedPost">
            <div class="top">
                {/* {
                    profile.val.avatar.length > 0 ?
                    <div class="avatar">
                        <Picture src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${profile.val.avatar[0].id}.webp`} picture={{type: "photo", id: profile.val.avatar[0].id, alt: "", blurhash: profile.val.avatar[0].blurhash, width: 1, height: 1}} />
                    </div> : <AvatarPlaceholder name={profile.val.name != "" ? profile.val.name : profile.val.username} />
                } */}
                <div class="center">
                    <div class="title">
                        {/* <div class="info">
                            <span class="name">{profile.val.name != "" ? profile.val.name : profile.val.username}</span>
                            
                            { profile.val.verified ? <VerifiedIcon /> : null }
                            { item.is_edited ? <EditedIcon /> : null }

                            <Duration date={item.date} />                          
                        </div> */}

                    </div>
                    
                    
                    <div class="content">
                        {
                            item.text != "" ?
                            <div class="text">
                                <FormatText>
                                    {item.text}
                                </FormatText>
                            </div> : null
                        }
                        
                        
                        <Media media={item.attachments.media} />
                    </div>
                </div>
                
            </div>
        </div>
    )
}