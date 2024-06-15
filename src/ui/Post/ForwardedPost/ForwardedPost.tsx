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
import Duration from "../../Duration";
import { store } from "@/data";
import FormatText from "@/ui/FormatText";
import { derive } from "hywer/jsx-runtime";
import { navigateTo } from "hywer/x/router";
import Video from "@/ui/Video/Video";

interface ForwardedPostProps {
    post_id: string;
    user_id: string

}

export default function ForwardedPost({ post_id, user_id }: ForwardedPostProps) {
    const item = store.getPost(post_id)
    const post = item.post.get()

    const user = store.getProfileById(user_id)

    const profile = user.user.get()

    return (
        <div onClick={() => navigateTo(`/p/${post_id}`, { replace: false })} onDblClick={(e: Event) => e.stopPropagation()} class="forwardedPost">
            <div class="top">
                <div class="avatar">
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
                </div>
                <div class="center">
                    <div class="title">
                        <div class="info">
                            {
                                derive(([name, username]) => {
                                    return <span class="name">
                                        {name.val != "" ? name.val : username.val}
                                    </span>
                                }, [profile.name, profile.username])
                            }

                            {
                                profile.verified.derive((val) => {
                                    if (val) {
                                        return <VerifiedIcon />
                                    } else {
                                        return <div style="display: none;" />
                                    }
                                })

                            }
                                                        {
                                post.is_edited.derive((val) => {
                                    if (val) {
                                        return <EditedIcon />
                                    } else {
                                        return <div style="display: none;" />
                                    }
                                })
                            }

                            <Duration date={post.date.val} />                         
                        </div>

                    </div>
                    
                    
                    <div class="content">
                        {
                            post.text.derive((val) => {
                                if (val != "") {
                                    return <div class="text">
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
                            post.attachments.media.derive((val) => {
                                if (val.length > 0) {
                                    return <Media media={val} />
                                } else {
                                    return <></>
                                }
                            })
                        }
                    </div>
                </div>
                
            </div>
        </div>
    )
}