import './styles.css'
import { store } from "@/data"
import EditedIcon from "@/ui/icons/edited"
import CommentIcon from "@/ui/icons/comment"
import PinnedIcon from '@/ui/icons/pinned'
import VerifiedIcon from '@/ui/icons/verified'
import AvatarPlaceholder from '@/ui/AvatarPlaceholder/AvatarPlaceholder'
//import Media from './Media/Media.tsx'
import Duration from '@/ui/Duration.tsx'
import Picture from '@/ui/Picture/index.tsx'
// import Link from '@/ui/utils/crutches/Link.tsx'
import { isIOS } from '@/ui/utils/crutches/platform.ts'
import Reactions from '@/ui/Reactions/Reactions.tsx'
// import Poll from '../Poll/Poll.tsx'
import FormatText from '@/ui/FormatText.tsx'
import MusicWidget from '@/ui/MusicWidget/MusicWidget.tsx'
import { Link, navigateTo } from 'hywer/x/router'
import { showContextMenu } from '@/ui/ContextMenu/ContextMenu.tsx'
import LanguageIcon from '@/ui/icons/language.tsx'
import { showTranslateFlow } from '@/ui/TranslateFlow/TranslateFlow.tsx'
//import ErrorPlaceholder from './ForwardedPost/ErrorPlacheolder.tsx'
import PointsIcon from '@/ui/icons/points'
import DeleteIcon from '@/ui/icons/delete.tsx'
import { derive } from 'hywer/jsx-runtime'
import type { ReactiveComment } from '@/data/ReactiveComment.ts'

interface CommentProps {
    item: ReactiveComment;
    creator_id: string;
    onVisible?: () => void
    onDelete: (id: string) => void
}

function Comment({item, creator_id, onVisible, onDelete}: CommentProps) {

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

        const trackableComment = document.querySelector('.comment.trackable')
        if (trackableComment) observer.observe(trackableComment)
    })

    const {strings, locale} = store.locale()

    const comment = item.get()
    const {user, state} = store.getProfileById(comment.peer.id.val)
    const profile = user.get()

    const user_id = store.auth.user_id()



    function onReact(reaction_id: string) {

    }

    function Menu() {   

        return (
            <>
                {/* <button onClick={() => {object.val = {id: comment.id.val, type: "post"}; openModal("shareFlow", [1], false)}}>
                    <ShareIcon />
                    {strings['share']}
                </button> */}
                {
                    comment.language.derive((val) => {
                        if (val != "notSet" && val != locale.val.split("-")[0]) {
                            return <button onClick={() => {showTranslateFlow(comment.id.val, 'comment', comment.text.val, comment.language.val)}}>
                                <LanguageIcon />
                                {strings['translate']}
                            </button>
                        } else {
                            return <div style="display: none;" />
                        }
                    })
                }

                {
                    comment.peer.id.val == user_id ?
                    <button class="delete" onClick={() => {onDelete(comment.id.val)}}>
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
        <article onDblClick={react} class={"comment"+(onVisible ? " trackable" : "")} onContextMenu={showMenu}>
            <div class="top">
                <Link class="avatar" path={derive(([username]) => `/u/${username.val}`, [profile.username])} aria-label={derive(([name, username]) => name.val != "" ? name.val : username.val, [profile.name, profile.username])}>
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


                <div class="center">
                    <div class="title">
                        <div class="info">
                            {/* <A class={props.post.peer.id == props.profile.id ? "name creator" : "name"}  onDblClick={(e: Event) => e.stopPropagation()} onClick={showUserModal} aria-label={props.profile.name != "" ? props.profile.name : props.profile.username} href={`/u/${props.profile.username}`}>{props.profile.name != "" ? props.profile.name : props.profile.username}</A> */}
                            
                            {
                                derive(([name, username]) => {
                                    return <Link class={"name"} path={`/u/${username.val}`} aria-label={name.val != "" ? name.val : username.val}>
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
                                comment.is_edited.derive((val) => {
                                    if (val) {
                                        return <EditedIcon />
                                    } else {
                                        return <div style="display: none;" />
                                    }
                                })
                            }
                            <Duration date={comment.date.val} />
                            {
                                comment.is_pinned.derive((val) => {
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
                        {
                            comment.text.derive((val) => {
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
                        
                        
                        {/* <Media onDownload={() => {}} media={props.item.attachments.media} /> */}


                        {
                            comment.attachments.audios.derive((val) => {
                                if (val.length > 0) {
                                    return <MusicWidget type='post' audios={comment.attachments.audios.val}/>
                                } else {
                                    return <div style="display: none;" />
                                }
                            })
                        }
                    </div>
                
                    <Reactions onReact={onReact} reactions={comment.reactions} />
                </div>
                
            </div>
        </article>
    )
}

export default Comment