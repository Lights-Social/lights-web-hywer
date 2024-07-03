import LinkIcon from "@/ui/icons/link"
import RepostIcon from "@/ui/icons/repost"
import Favorites from "@/ui/icons/favorites"
import Favorites_outlined from "@/ui/icons/favorites_outlined"
import PointsIcon from '@/ui/icons/points'
import { store } from "@/data"
import type { IPost } from "@/data/types/models"
import type { RecReactiveProxy } from "hywer/x/store"
import { closeModal } from "../Modal/Modal"
import type { Reactive } from "hywer/jsx-runtime"

interface ShareButtonsProps {
    item: Reactive<RecReactiveProxy<IPost> | undefined>
}

export default function ShareButtons({item}: ShareButtonsProps) {
    const {strings} = store.locale()

    function repost() {

    }

    function toggleFavorite() {
        if (!item.val) return 

        if (!item.val.is_favorite.val) {
            item.val.is_favorite.val = true
        } else {
            item.val.is_favorite.val = false
        }
    }

    return (
        <div class="shareButtons">
            <button onClick={() => {navigator.clipboard.writeText("https://web.lightsapp.net/p/" + item.val?.id.val + "?target=share"); closeModal("postShareFlow")}}>
                <div class="iconWrapper">
                <LinkIcon />
                </div>

                {strings["copyLink"]}
            </button>
            {
                item.derive((val) => {
                    if (val) {
                        return <div>
                            {
                                val.access.derive((access) => {
                                    if (access == "all") {
                                        return <button onClick={() => {repost(); closeModal("postShareFlow")}}>
                                            <div class="iconWrapper">
                                                <RepostIcon />
                                            </div>
                                            {strings["repost"]}
                                        </button>
                                    } else {
                                        return <div style={"display: none"} />
                                    }
                                })
                            }
                        </div>
                            
                    } else {
                        return <div style={"display: none"} />
                    }
                })
            }
            {
                item.derive((val) => {
                    if (val) {
                        return <div>
                            {val.is_favorite.derive((is_favorite) => {
                                if (is_favorite == false) {
                                    return <button onClick={() => toggleFavorite()}>
                                        <div class="iconWrapper">
                                            <Favorites_outlined />
                                        </div>
                                        {strings["addToFavorites"]}
                                    </button>
                                } else {
                                    return <button onClick={() => toggleFavorite()}>
                                        <div class="iconWrapper">
                                            <Favorites />
                                        </div>
                                        {strings["removeFromFavorites"]}
                                    </button>
                                }
                            })}

                        </div>
                    } else {
                        return <div style={"display: none"} />
                    }
                })
            }
            {
                navigator.share! ?
                <button onClick={() => { closeModal("postShareFlow")}}>
                    <div class="iconWrapper">
                        <PointsIcon />
                    </div>

                    {strings["more"]}
                </button> : <div style={"display: none"} />
            }
        </div>
    )
}