import { ref, type Reactive } from "hywer";
import type { IProfile } from "./types/models";

export class ReactiveProfile {
    private _profileRef: Reactive<IProfile>
    constructor(profile: IProfile) {
        this._profileRef = ref(profile)

    }

    public get() {
        return this._profileRef
    }

    set name(name: string) {
        this._profileRef.val.name = name

        this._profileRef.react()

    }

    set about(about: string) {
        this._profileRef.val.about = about

        this._profileRef.react()
    }
    
}