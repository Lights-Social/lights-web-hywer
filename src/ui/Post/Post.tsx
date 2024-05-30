import './styles.css'
import { store } from "@/data"
import { type IPost } from "@/data/types/models"

import EditedIcon from "@/ui/icons/edited"
import CommentIcon from "@/ui/icons/comment"
import AccessBadge from "./AccessBadge/AccessBadge"
import PinnedIcon from '@/ui/icons/pinned'
import VerifiedIcon from '@/ui/icons/verified'
import AvatarPlaceholder from '../AvatarPlaceholder/AvatarPlaceholder'
import Media from './Media/Media.tsx'
import ForwardedPost from './ForwardedPost/ForwardedPost.tsx'
import Duration from './Duration.tsx'
import Picture from '../Picture/index.tsx'
// import Link from '@/ui/utils/crutches/Link.tsx'
import shake from '../shake.ts'
import { isIOS } from '@/ui/utils/crutches/platform.ts'
import Reactions from '@/ui/Reactions/Reactions.tsx'
// import Poll from '../Poll/Poll.tsx'
import FormatText from '../FormatText.tsx'
import MusicWidget from '../MusicWidget/MusicWidget.tsx'
import { Link } from 'hywer/x/router'
import { showContextMenu } from '../ContextMenu/ContextMenu.tsx'
import ShareIcon from '../icons/share.tsx'
import { object } from './ShareFlow/ShareFlow.tsx'
import { openModal } from '../Modal/Modal.tsx'
import LanguageIcon from '../icons/language.tsx'
import { showTranslateFlow } from '@/ui/TranslateFlow/TranslateFlow.tsx'
import ErrorPlaceholder from './ForwardedPost/ErrorPlacheolder.tsx'
import PointsIcon from '@/ui/icons/points'
import DeleteIcon from '../icons/delete.tsx'
import { derive, effect } from 'hywer/jsx-runtime'

interface PostProps {
    post: IPost
    onVisible?: () => void
    onDelete: (id: string) => void
}

function Post({post, onVisible, onDelete}: PostProps) {

    const options = {
        // родитель целевого элемента - область просмотра
        root: null,
        // без отступов
        rootMargin: '0px',
        // процент пересечения - половина изображения
        threshold: 0.1
    }

    // создаем наблюдатель
    const observer = new IntersectionObserver((entries, observer) => {
        // для каждой записи-целевого элемента
        entries.forEach(entry => {
            // если элемент является наблюдаемым
            if (entry.isIntersecting) {
                const element = entry.target

                observer.unobserve(element)
                element.classList.remove('trackable')

                onVisible && onVisible()
            }
        })
    }, options)

    setTimeout(() => {
        if (!onVisible) return

        observer.observe(document.querySelector('.post.trackable')!)
    })

    const {strings, locale} = store.locale()

    const {user, state} = store.getProfileById(post.peer.id)
    const profile = user.get()

    const user_id = store.auth.user_id()



    function shakeOnClick() {
        if (window.location.pathname == `/u/${profile.username.val}`) {
            shake(document.querySelector(".postsList") as HTMLElement)
        }
    }

    function onReact(reaction_id: string) {

    }

    function Menu() {   

        return (
            <>
                <button onClick={() => {object.val = {id: post.id, type: "post"}; openModal("shareFlow", [1], false)}}>
                    <ShareIcon />
                    {strings['share']}
                </button>
                {
                    post.language != "notSet" && post.language != locale.split("-")[0] ?
                    <button onClick={() => {showTranslateFlow(post)}}>
                        <LanguageIcon />
                        {strings['translate']}
                    </button> : null
                }
                {
                    post.peer.id == user_id ?
                    <button class="delete" onClick={() => {onDelete(post.id)}}>
                        <DeleteIcon />
                        {strings['delete']}
                    </button> : null
                }
            </>   
        )
    }

    function showMenu(e: MouseEvent) {
        e.preventDefault()

        showContextMenu(<Menu />, {x: e.pageX, y: e.pageY})

    }

    function react() {
        console.log("react")
    }


    return (
        <article onDblClick={react} class={"post"+(onVisible ? " trackable" : "")} onContextMenu={showMenu}>
            <div class="title">
                <div class="info"> 
                    {
                        derive(([name, username]) => {
                            return <Link onClick={shakeOnClick} class="name" path={`/u/${username.val}`} aria-label={name.val != "" ? name.val : username.val}>
                                {name.val != "" ? name.val : username.val}
                            </Link>
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
                    { post.is_edited ? <EditedIcon /> : null }
                    <Duration date={post.date} />
                    { post.is_pinned ? <PinnedIcon /> : null}
                </div>

                {
                    isIOS ?
                    <button onClick={(e: Event) => {/*toggle({x: e.pageX - 330, y: e.pageY + 10}, contextMenuButtons())*/}} class="optionsButton">
                        <PointsIcon />
                    </button> : null
                }
            </div>
            
            
            <div class="content">
                <AccessBadge access={post.access} />
                {
                    post.text != "" ?
                    <div class="text">
                        <FormatText>
                            {post.text}
                        </FormatText>
                    </div> : null
                }
                
                {
                    post.reposts.count > 0 ? (post.reposts.objects[0].notAvailable ? <ErrorPlaceholder /> : <ForwardedPost item={post.reposts.initialPosts[0]} />) : null
                }
                
                {post.attachments.media.length > 0 ? <Media media={post.attachments.media}/> : null}

                {post.attachments.audios.length > 0 ? <MusicWidget type='post' audios={post.attachments.audios}/> : null}

                {/* <Poll /> */}
            </div>
            <Link onClick={shakeOnClick} class="avatar" path={derive(([username]) => `/u/${username.val}`, [profile.username])} aria-label={derive(([name, username]) => name.val != "" ? name.val : username.val, [profile.name, profile.username])}>
                {
                    profile.avatar.derive((val) => {
                        if (val.length > 0) {
                            return <Picture src={val[0].id} picture={{id: val[0].id, alt: "", blurhash: val[0].blurhash, width: 1, height: 1, type: 'photo'}} />
                        } else {
                            return <AvatarPlaceholder name={derive(([name, username]) => name.val != "" ? name.val : username.val, [profile.name, profile.username])} />
                        }
                    })
                }
            </Link>
                



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
                            post.comments.count == 0 ? strings["leaveAComment"] : `${post.comments.count}`
                        }
                    </div>
                </div>
            {/* </Show> */}
            

            <Reactions onReact={onReact} reactions={post.reactions} />
        </article>
    )
}

export default Post