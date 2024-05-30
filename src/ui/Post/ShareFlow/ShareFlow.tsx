import { store } from "@/data"
import { ReactivePost } from "@/data/ReactivePost"
import type { IPost } from "@/data/types/models"
import { Modal, closeModal } from "@/ui/Modal/Modal"
import BackIcon from "@/ui/icons/back"
import Favorites from "@/ui/icons/favorites"
import Favorites_outlined from "@/ui/icons/favorites_outlined"
import LinkIcon from "@/ui/icons/link"
import PointsIcon from '@/ui/icons/points'
import RepostIcon from "@/ui/icons/repost"
import { derive, effect, ref } from "hywer"


const object = ref<{type: string, id: string}>({type: "", id: ""})


const defaultPost: IPost = {
    id: "",
    is_pinned: false,
    is_edited: false,
    text: "",
    language: "",
    attachments: {
        media: [],
        links: undefined,
        audios: []
    },
    date: "",
    reactions: [],
    comments: {
        commenting: false,
        count: 0
    },
    views: 0,
    peer: {
        id: "",
        type: "user"
    },
    access: "all",
    reposts: {
        count: 0,
        objects: [],
        initialPosts: []
    },
    is_favorite: false
}

function ShareFlow() {

    const {strings} = store.locale()

    function toggleFavorite() {
        if (!item.val) return 

        if (!item.val.get().val.is_favorite) {
            item.val.is_favorite = true
        } else {
            item.val.is_favorite = false
        }
    }

    function repost() {

    }

    const item = ref<ReactivePost | undefined>(undefined)

    effect(() => {
        if (object.val.id != "") {
            store.getPost(object.val.id).then((post) => {
                if (post) {
                    item.val = post
                }
            })
        }
    }, [object])

    return (
        <Modal id="shareFlow" type="flow">
            <div class='bar'>
                <button class='close' onClick={() => closeModal("shareFlow")}>
                    <BackIcon />

                    {strings["back"]}
                </button>

                <div class="title">
                    {strings["share"]}
                </div>
            </div>

            <div class="shareButtons">
                <button onClick={() => {navigator.clipboard.writeText("https://web.lightsapp.net/p/" + object.val.id + "?target=share"); closeModal("shareFlow")}}>
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
                                    val.get().derive((post) => {
                                        if (post.access == "all") {
                                            return <button onClick={() => {repost(); closeModal("shareFlow")}}>
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
                                {val.get().derive((post) => {
                                    if (post.is_favorite == false) {
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
                    !navigator.share! ?
                    <button onClick={() => { closeModal("shareFlow")}}>
                        <div class="iconWrapper">
                            <PointsIcon />
                        </div>

                        {strings["more"]}
                    </button> : null
                }
            </div>
        </Modal>
    )
}

export {ShareFlow, object}