import type { IAvatar, IProfile } from "./types/models";
import { recRef, store as hywerStore, type RecReactiveProxy } from "hywer/x/store";

export class ReactiveProfile {
    private _profileRef: RecReactiveProxy<IProfile>
    constructor(profile: IProfile) {
        this._profileRef = hywerStore(profile)

    }

    public get() {
        setTimeout(() => {
                this.name = "пенис"


                // this.addAvatar({
                //     "id": "2de5ab0f7dc605",
                //     "wrapper": "",
                //     "blurhash": "LJGHuM^*L2o}}?Rj9]V@GHo}$%s.",
                //     "date": 1716598231,
                // })

                //console.log(`username: ${this._profileRef.username.val}`, 'avatar: '+ this._profileRef.avatar.val[0].id)

                //this._profileRef2.val.name.val = "пенис"

                //console.log(this._profileRef2.val)
        }, 2000)

        
        return this._profileRef
    }

    set profile(profile: IProfile) {
        this._profileRef.avatar.val = profile.avatar
        this._profileRef.name.val = profile.name
        this._profileRef.username.val = profile.username
        this._profileRef.is_premium.val = profile.is_premium
        this._profileRef.verified.val = profile.verified
        this._profileRef.about.val = profile.about
        this._profileRef.cover.val = profile.cover
        this._profileRef.friends.count.val = profile.friends.count
        this._profileRef.friends.friendship_state.val = profile.friends.friendship_state
        this._profileRef.id.val = profile.id
        this._profileRef.moments.val = profile.moments
        this._profileRef.note.val = profile.note
        this._profileRef.posts.val = profile.posts
        this._profileRef.status.last_activity.val = profile.status.last_activity
        this._profileRef.status.status.val = profile.status.status

        this._profileRef.avatar.react()
    }

    set name(name: string) {
        this._profileRef.name.val = name


    }

    set about(about: string) {
        this._profileRef.about.val = about
    }

    /**
     * Add new avatar
     */
    public addAvatar(avatar: IAvatar) {
        this._profileRef.avatar.val.unshift(avatar)

        this._profileRef.avatar.react()
    }
    
}