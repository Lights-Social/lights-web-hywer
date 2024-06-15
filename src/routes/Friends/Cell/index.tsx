import { store } from "@/data";
import './styles.css'
import VerifiedIcon from '@/ui/icons/verified'
import MessengerIcon from '@/ui/icons/messenger'
import MapIcon from '@/ui/icons/map'
import CheckmarkIcon from "@/ui/icons/checkmark";
import CloseIcon from "@/ui/icons/close";
import Picture from "@/ui/Picture";
import AvatarPlaceholder from "@/ui/AvatarPlaceholder/AvatarPlaceholder";
import { navigateTo } from "hywer/x/router"
import { openModal } from "@/ui/Modal/Modal";
import type { ReactiveProfile } from "@/data/ReactiveProfile";
import { derive } from "hywer/jsx-runtime";
import Video from "@/ui/Video/Video";

interface CellProps {
    item: ReactiveProfile;
    //onOpenUser: (username: string) => void;
    type: "outgoing" | "incoming" | "friend" | "search";
    onDelete?: (id: string) => void;
    onVisible?: () => void
}

export default function Cell(props: CellProps) {
    const profile = props.item.get()

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

                props.onVisible && props.onVisible()
            }
        })
    }, options)

    setTimeout(() => {
        if (!props.onVisible) return

        const trackableCell = document.querySelector('.cell.trackable')
        if (trackableCell) observer.observe(trackableCell)

    })


    async function sendFriendRequest() {

        if (navigator.vibrate) navigator.vibrate(1)

        props.onDelete && props.onDelete(props.item.get().id.val)

        store.addFriend(props.item.get().id.val)
	}

    async function cancelFriendRequest() {
        props.onDelete && props.onDelete(props.item.get().id.val)

        store.deleteFriend(props.item.get().id.val)

	}

    return (
            <div class={"cell"+(props.onVisible ? " trackable" : "")} onClick={() => navigateTo(`/u/${props.item.get().username.val}`)}>
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
                </div>
                <div class="title">
                    <div class="info">
                        <div class="name">
                            {
                                derive(([name, username]) => {
                                    return name.val != "" ? name.val : username.val
                                }, [profile.name, profile.username])
                            }
                        </div>
                        
                        {
                            profile.verified.derive((val) => {
                                if (val) {
                                    return <VerifiedIcon />
                                } else {
                                    return <div style="display: none;" />
                                }
                            })
                        }
                    </div>
                    {
                        props.type == "search" ?
                        <div class="username">
                            {
                                derive(([username]) => {
                                    return username.val
                                }, [profile.username])
                            }
                        </div> : null
                    }
                </div>
                
                <div class="buttons">
                    {props.type == "friend" ? <>
                        <button onClick={(e: Event) => {e.stopPropagation(); openModal("messengerErrorModal", [7,7,7,7], false)}}>
                            <MessengerIcon />
                        </button>
                        <button onClick={(e: Event) => {e.stopPropagation(); openModal("mapErrorModal", [7,7,7,7], false)}}>
                            <MapIcon />
                        </button>
                    </> : null}

                    {props.type == "incoming" ? <>
                        <button class="accept" onClick={(e: Event) => {e.stopPropagation(); sendFriendRequest()}}>
                            <CheckmarkIcon />
                        </button>
                        <button onClick={(e: Event) => {e.stopPropagation(); cancelFriendRequest()}}>
                            <CloseIcon />
                        </button>
                    </> : null}
                </div>
            </div>
    )
}