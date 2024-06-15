import { effect, ref, type Reactive } from "hywer";
import type { IComment, IPost, IProfile } from "./types/models";
import { store } from ".";
import { store as hywerStore, type RecReactiveProxy } from "hywer/x/store";

export const emptyComment: IComment = {
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
    replies: {
        isAuthorReplied: false,
        count: 0
    },
    peer: {
        id: "",
        type: "user",
    }
}

export class ReactiveComment {
    private _commentRef: RecReactiveProxy<IComment>
    constructor(comment: IComment) {
        this._commentRef = hywerStore(comment)

    }

    public get() {        
        return this._commentRef
    }

    set comment(comment: IComment) {
        
    }
    set text(text: string) {
        this._commentRef.text.val = text
    }
    
}