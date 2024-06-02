import { areArraysEqual } from "@/ui/utils/areArraysEqual";
import type { IAvatar, IProfile } from "./types/models";
import { store as hywerStore, type RecReactiveProxy } from "hywer/x/store";

export const emptyProfile = {
    id: "",
    name: "",
    about: "",
    username: "",
    is_premium: false,
    sex: null,
    avatar: [],
    cover: "",
    verified: false,
    status: {last_activity: 0, status: "inactive"},
    followers: {
        count: 0,
        is_following: false,
    },
    friends: {
        count: 0,
        friendship_state: "notFriends",
    },
    note: "",
    wallet_uri: "",
    posts: 0,
    moments: 0,
}

export class ReactiveProfile {
    private _profileRef: RecReactiveProxy<IProfile>
    constructor(profile: IProfile) {
        this._profileRef = hywerStore(profile)

    }

    public get() {        
        return this._profileRef
    }

    set profile(profile: IProfile) {
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

        if (!areArraysEqual(this._profileRef.avatar.val, profile.avatar)) {
            this._profileRef.avatar.val = profile.avatar
            this._profileRef.avatar.react()
        }
    }
    set name(name: string) {
        this._profileRef.name.val = name
    }

    set username(username: string) {
        this._profileRef.username.val = username
    }

    set is_premium(is_premium: boolean) {
        this._profileRef.is_premium.val = is_premium
    }

    set verified(verified: boolean) {
        this._profileRef.verified.val = verified
    }

    set about(about: string) {
        this._profileRef.about.val = about
    }

    set cover(cover: string) {
        this._profileRef.cover.val = cover
    }

    set friends_count(friends_count: number) {
        this._profileRef.friends.count.val = friends_count
    }

    set friendship_state(friendship_state: string) {
        this._profileRef.friends.friendship_state.val = friendship_state
    }

    /**
     * Change number of moments
     */
    set moments(moments: number) {
        this._profileRef.moments.val = moments
    }

    /**
     * Editing a user note
     */
    set note(note: string) {
        this._profileRef.note.val = note
    }

    /**
     * Change number of posts
     */
    set posts(posts: number) {
        this._profileRef.posts.val = posts
    }

    /**
     * Changing the last activity time
     */
    set last_activity(last_activity: number) {
        this._profileRef.status.last_activity.val = last_activity
    }

    /**
     * Changing the online presence status
     */
    set status(status: string) {
        this._profileRef.status.status.val = status
    }

    /**
     * Add new avatar
     */
    public addAvatar(avatar: IAvatar) {
        this._profileRef.avatar.val.unshift(avatar)

        this._profileRef.avatar.react()
    }

    /**
     * Remove last avatar
     */
    public removeAvatar() {
        this._profileRef.avatar.val.shift()
        this._profileRef.avatar.react()
    }
    
}