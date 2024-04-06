import './styles.css'
import Picture from "../Picture"
import { store } from "@/data"
import { type IPost, type IProfile } from "@/data/types/models"

import EditedIcon from "@/ui/icons/edited"
import CommentIcon from "@/ui/icons/comment"
import AccessBadge from "./AccessBadge/AccessBadge"
import PinnedIcon from '@/ui/icons/pinned'
import VerifiedIcon from '@/ui/icons/verified'
import AvatarPlaceholder from '../AvatarPlaceholder/AvatarPlaceholder'

interface PostProps {
    post: IPost
    profile: IProfile
}

function Post({post, profile}: PostProps) {

    const locale = store.locale()
    return (
        <article class="post">
            <div class="title">
                <div class="info">
                    <a aria-label={profile.name != "" ? profile.name : profile.username} class="name" href={`/u/${profile.username}`} data-route>{profile.name != "" ? profile.name : profile.username}</a>
                    { profile.verified ? <VerifiedIcon /> : null }
                    { post.is_edited ? <EditedIcon /> : null }

                    <time datetime={post.date}>
                        {/* <Duration date={props.item.date} /> */}
                    </time>
                    { post.is_pinned ? <PinnedIcon /> : null}
                </div>

                {/* <Show when={isIOS}>
                    <button onClick={(e) => {toggle({x: e.pageX - 330, y: e.pageY + 10}, contextMenuButtons())}} class="optionsButton">
                        <svg viewBox="0 0 25 7" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.4725 0.274902C1.6925 0.274902 0.25 1.7199 0.25 3.4999C0.25 5.2799 1.6925 6.7249 3.4725 6.7249C5.2525 6.7249 6.695 5.2824 6.695 3.4999C6.6975 1.7199 5.255 0.274902 3.4725 0.274902ZM12.5 0.274902C10.72 0.274902 9.275 1.7174 9.275 3.4974C9.275 5.2774 10.7175 6.7224 12.5 6.7224C14.28 6.7224 15.7225 5.2799 15.7225 3.4974C15.7225 1.7199 14.28 0.274902 12.5 0.274902ZM21.5275 0.274902C19.7475 0.274902 18.305 1.7174 18.305 3.4974C18.305 5.2774 19.7475 6.7224 21.5275 6.7224C23.3075 6.7224 24.75 5.2799 24.75 3.4974C24.75 1.7199 23.3075 0.274902 21.5275 0.274902Z" />
                        </svg>
                    </button>
                </Show> */}
            </div>
            
            
            <div class="content">
                <AccessBadge access={post.access} />
                {
                    post.text != "" ?
                    <div class="text">
                        {post.text}
                    </div> : null
                }

                
                {/* <Show when={props.item.reposts.count == 1}>
                    <Switch>
                        <Match when={props.item.reposts.objects[0].notAvailable}>
                            <ErrorPlaceholder />
                        </Match>
                        <Match when={props.item.reposts.initialPosts[0]}>
                            <ForwardedPost item={props.item.reposts.initialPosts[0]} profile={props.profileOfRepostedPost!} />

                        </Match>
                    </Switch>
                </Show>
                 */}
                
                {/* <Pictures onDownload={props.onPictureDownload} photos={props.item.attachments.photos} /> */}
            </div>
            <a aria-label={profile.name != "" ? profile.name : profile.username} class="name" href={`/u/${profile.username}`}>
                {/* <Picture picture={profile.avatar[0].photo_id} /> */}

                {profile.avatar[0] ? null : <AvatarPlaceholder width={40} height={40} name={profile.name != "" ? profile.name : profile.username} />}
            </a>

            {/* <A onDblClick={(e: Event) => e.stopPropagation()} onClick={showUserModal} aria-label={props.profile.name != "" ? props.profile.name : props.profile.username} class="avatarWrapper" href={`/u/${props.profile.username}`}>
                <Avatar avatar={props.profile.avatar} name={props.profile.name != "" ? props.profile.name : props.profile.username} />
            </A> */}
            {/* <Show when={!props.full}> */}
                <div class="line">
                    <hr />
                </div>
                <div class="buttons">
                    <div class="replies">
                        <CommentIcon />
                        {
                            post.comments.count == 0 ? locale["leaveAComment"] : `${post.comments.count}`
                        }
                    </div>
                </div>
            {/* </Show> */}
            

            {/* <Reactions onReact={(reaction_id: string) => props.onReact(props.item.id, reaction_id)} reactions={props.item.reactions} /> */}
        </article>
    )
}

export default Post