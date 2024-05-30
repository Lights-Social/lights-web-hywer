import { effect, ref, type Reactive } from "hywer";
import type { IPost } from "./types/models";
import { store } from ".";

export class ReactivePost {
    private _postRef: Reactive<IPost>
    constructor(post: IPost) {
        this._postRef = ref(post)

    }

    public get() {
        return this._postRef
    }

    set text(text: string) {
        this._postRef.val.text = text

        this._postRef.react()
    }

    set is_favorite(is_favorite: boolean) {
        if (is_favorite) {
            store.addFavoritePost(this._postRef.val.id)
        } else {
            store.removeFavoritePost(this._postRef.val.id)
        }


        this._postRef.val.is_favorite = is_favorite
        this._postRef.react()
    }
    
}