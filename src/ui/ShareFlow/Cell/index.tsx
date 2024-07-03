import './styles.css'
import VerifiedIcon from '@/ui/icons/verified'
import Picture from "@/ui/Picture";
import AvatarPlaceholder from "@/ui/AvatarPlaceholder/AvatarPlaceholder";
import type { ReactiveProfile } from "@/data/ReactiveProfile";
import { derive } from "hywer/jsx-runtime";
import Video from "@/ui/Video/Video";
import Checkbox from "@/ui/Checkbox";
import random_id from "@/ui/utils/random_id";

interface CellProps {
    item: ReactiveProfile;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    onVisible?: () => void;
    isSelected: boolean;
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


    const id = random_id()

    function toggle() {
        const checkbox = document.getElementById(id) as HTMLInputElement

        if (checkbox.checked) {
            props.onSelect(id)
        } else {
            props.onDelete(id)
        }
    }

    function click(e: Event) {
        e.stopPropagation()
        const checkbox = document.getElementById(id) as HTMLInputElement
        checkbox.click()
    }

    return (
            <div class={"cell"+(props.onVisible ? " trackable" : "")} onClick={click}>
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
                </div>

                <Checkbox checked={props.isSelected} onDisable={toggle} onEnable={toggle} id={id} />
            </div>
    )
}