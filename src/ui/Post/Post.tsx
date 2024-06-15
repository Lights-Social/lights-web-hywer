import './styles.css'
import { store } from "@/data"
import EditedIcon from "@/ui/icons/edited"
import CommentIcon from "@/ui/icons/comment"
import AccessBadge from "./AccessBadge/AccessBadge"
import PinnedIcon from '@/ui/icons/pinned'
import VerifiedIcon from '@/ui/icons/verified'
import AvatarPlaceholder from '../AvatarPlaceholder/AvatarPlaceholder'
import Media from './Media/Media.tsx'
import ForwardedPost from './ForwardedPost/ForwardedPost.tsx'
import Duration from '../Duration.tsx'
import Picture from '../Picture/index.tsx'
// import Link from '@/ui/utils/crutches/Link.tsx'
import shake from '../shake.ts'
import { isIOS } from '@/ui/utils/crutches/platform.ts'
import Reactions from '@/ui/Reactions/Reactions.tsx'
// import Poll from '../Poll/Poll.tsx'
import FormatText from '../FormatText.tsx'
import MusicWidget from '../MusicWidget/MusicWidget.tsx'
import { Link, navigateTo } from 'hywer/x/router'
import { showContextMenu } from '../ContextMenu/ContextMenu.tsx'
import ShareIcon from '../icons/share.tsx'
import { object } from '../ShareFlow/ShareFlow.tsx'
import { openModal } from '../Modal/Modal.tsx'
import LanguageIcon from '../icons/language.tsx'
import { showTranslateFlow } from '@/ui/TranslateFlow/TranslateFlow.tsx'
import ErrorPlaceholder from './ForwardedPost/ErrorPlacheolder.tsx'
import PointsIcon from '@/ui/icons/points'
import DeleteIcon from '../icons/delete.tsx'
import { derive } from 'hywer/jsx-runtime'
import type { ReactivePost } from '@/data/ReactivePost.ts'
import Video from '../Video/Video.tsx'

interface PostProps {
    item: ReactivePost
    onVisible?: () => void
    onDelete: (id: string) => void
    full?: boolean
}

function Post({item, onVisible, onDelete, full}: PostProps) {

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
        
        const trackablePost = document.querySelector('.post.trackable')
        if (trackablePost) observer.observe(trackablePost)
    })

    const {strings, locale} = store.locale()

    const post = item.get()
    const {user, state} = store.getProfileById(post.peer.id.val)
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
                <button onClick={() => {object.val = {id: post.id.val, type: "post"}; openModal("shareFlow", [1], false)}}>
                    <ShareIcon />
                    {strings['share']}
                </button>
                {
                    post.language.derive((val) => {
                        if (val != "notSet" && val != locale.split("-")[0]) {
                            return <button onClick={() => {showTranslateFlow(post.id.val, 'post', post.text.val, post.language.val)}}>
                                <LanguageIcon />
                                {strings['translate']}
                            </button>
                        } else {
                            return <div style="display: none;" />
                        }
                    })
                }

                {
                    post.peer.id.val == user_id ?
                    <button class="delete" onClick={() => {onDelete(post.id.val)}}>
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
                    {
                        post.is_pinned.derive((val) => {
                            if (val) {
                                return <PinnedIcon />
                            } else {
                                return <div style="display: none;" />
                            }
                        })
                    }
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
                    derive(([count, objects, initialPosts]) => {
                        if (count.val > 0) {
                            if (objects.val[0].notAvailable) {
                                return <ErrorPlaceholder />
                            } else {
                                return <ForwardedPost user_id={initialPosts.val[0].peer.id} post_id={objects.val[0].post_id} />
                            }
                        } else {
                            return <div style="display: none;" />
                        }
                    }, [post.reposts.count, post.reposts.objects, post.reposts.initialPosts])
                }

                {
                    post.attachments.media.derive((val) => {
                        if (val.length > 0) {
                            return <Media media={val} />
                        } else {
                            return <div style="display: none;" />
                        }
                    })
                }

                {
                    post.attachments.audios.derive((val) => {
                        if (val.length > 0) {
                            return <MusicWidget type='post' audios={post.attachments.audios.val}/>
                        } else {
                            return <div style="display: none;" />
                        }
                    })
                }
                
                {/* <Poll /> */}
            </div>
            <Link onClick={shakeOnClick} class="avatar" path={derive(([username]) => `/u/${username.val}`, [profile.username])} aria-label={derive(([name, username]) => name.val != "" ? name.val : username.val, [profile.name, profile.username])}>
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
            </Link>
                


            {/* <Show when={!props.full}> */}
                <div class="line">
                    <hr />
                </div>
                <div class="buttons">
                    <div class="replies" onClick={() => navigateTo(`/p/${post.id.val}`, { replace: false })}>
                        <CommentIcon />
                        {
                            post.comments.count.derive((val) => {
                                if (val == 0) {
                                    return strings["leaveAComment"]
                                } else {
                                    return val
                                }
                            })
                        }
                    </div>
                </div>
            {/* </Show> */}


            {
                full ? <>
                    <div class="line">
                        <hr />
                    </div>
                    <div class="buttons">
                        <div class="replies" onClick={() => navigateTo(`/p/${post.id.val}`, { replace: false })}>
                            <CommentIcon />
                            {
                                post.comments.count.derive((val) => {
                                    if (val == 0) {
                                        return strings["leaveAComment"]
                                    } else {
                                        return val
                                    }
                                })
                            }
                        </div>
                    </div>
                </> : <div style="display: none;" />
            }
            

            <Reactions onReact={onReact} reactions={post.reactions} />
        </article>
    )
}

export default Post