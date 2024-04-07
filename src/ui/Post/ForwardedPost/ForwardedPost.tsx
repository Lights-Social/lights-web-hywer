//import { IPost, IProfile } from "../../../types/models";
//import FormatText from "../../FormatText";
//import Duration from "../Duration";
import "./styles.css"
//import Avatar from "../../Avatar";
// import Pictures from "../Pictures";
import type { IPost, IProfile } from "@/data/types/models";
import VerifiedIcon from '@/ui/icons/verified'
import EditedIcon from "@/ui/icons/edited"
import Pictures from "../Pictures";
import Picture from "@/ui/Picture";
import AvatarPlaceholder from "@/ui/AvatarPlaceholder/AvatarPlaceholder";
import Duration from "../Duration";

interface ForwardedPostProps {
    item: IPost
    profile: IProfile
}

export default function ForwardedPost({ item, profile }: ForwardedPostProps) {

    return (
        <div onDblClick={(e: Event) => e.stopPropagation()} class="forwardedPost">
            <div class="top">
                {
                    profile.avatar.length > 0 ?
                    <div class="avatar">
                        <Picture picture={{photo_id: profile.avatar[0].photo_id, alt: "", preview: profile.avatar[0].preview, width: 1, height: 1}} />
                    </div> : <AvatarPlaceholder width={40} height={40} name={profile.name != "" ? profile.name : profile.username} />
                }
                <div class="center">
                    <div class="title">
                        <div class="info">
                            <span class="name">{profile.name != "" ? profile.name : profile.username}</span>
                            
                            { profile.verified ? <VerifiedIcon /> : null }
                            { item.is_edited ? <EditedIcon /> : null }

                            <Duration date={item.date} />                          
                        </div>

                    </div>
                    
                    
                    <div class="content">
                        {
                            item.text != "" ?
                            <div class="text">
                                {/* <FormatText> */}
                                    {item.text}
                                {/* </FormatText> */}
                            </div> : null
                        }
                        
                        
                        <Pictures pictures={item.attachments.photos} />
                    </div>
                </div>
                
            </div>
        </div>
    )
}