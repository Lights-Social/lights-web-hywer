import { effect, ref, type Reactive } from "hywer";
import type { IPost, IProfile } from "./types/models";
import { store } from ".";
import { areArraysEqual } from "@/ui/utils/areArraysEqual";
import { store as hywerStore, type RecReactiveProxy } from "hywer/x/store";

export const emptyPost: IPost = {
    id: "",
    access: "all",
    is_edited: false,
    is_pinned: false,
    text: '',
    random_id: 0,
    language: "",
    attachments: {
        media: [],
        links: [],
        audios: [],
    },
    date: new Date().toISOString(),
    reactions: [],
    comments: {
        commenting: true,
        count: 0,
    },
    views: 0,
    peer: {
        id: '',
        type: "user",
    },
    reposts: {
        count: 0,
        objects: [],
        initialPosts: [],
    },
    is_favorite: false
}

export class ReactivePost {
    private _postRef: RecReactiveProxy<IPost>
    constructor(post: IPost) {
        this._postRef = hywerStore(post)

    }

    public get() {        
        return this._postRef
    }

    set post(post: IPost) {
        this._postRef.peer.id.val = post.peer.id
        this._postRef.peer.type.val = post.peer.type

        this._postRef.text.val = post.text
        this._postRef.access.val = post.access
        this._postRef.attachments.audios.val = post.attachments.audios
        this._postRef.attachments.media.val = post.attachments.media
        //this._postRef.attachments.links.val = post.attachments.links
        this._postRef.comments.commenting.val = post.comments.commenting
        this._postRef.comments.count.val = post.comments.count
        this._postRef.date.val = post.date
        this._postRef.id.val = post.id
        this._postRef.is_edited.val = post.is_edited
        this._postRef.is_favorite.val = post.is_favorite
        this._postRef.is_pinned.val = post.is_pinned
        this._postRef.language.val = post.language
        this._postRef.reactions.val = post.reactions
        this._postRef.reposts.count.val = post.reposts.count
        this._postRef.reposts.initialPosts.val = post.reposts.initialPosts
        this._postRef.reposts.objects.val = post.reposts.objects
        this._postRef.views.val = post.views

    }
    set text(text: string) {
        this._postRef.text.val = text
    }

    set is_favorite(is_favorite: boolean) {
        this._postRef.is_favorite.val = is_favorite
    }
    
}