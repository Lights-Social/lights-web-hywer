import { Api } from "@/api"
import type { IPost, IProfile, IResponsePosts } from "./types/models"
import { ref } from "hywer/jsx-runtime"

const availableLangs = ["en-US", "uk"]

interface ILocale {
    [key: string]: string
}

let localeStrings: ILocale = {}

const friends = ref<IProfile[]>([])


const feedPosts = ref<IPost[]>([])
let isEnd = false;
const profiles = ref<Map<string, IProfile>>(new Map())

export class Store {
    async setLocale(locale?: string) {

        if (locale) {
            document.documentElement.setAttribute("lang", locale)
        } else {
            navigator.languages.forEach(lang => {
                if (availableLangs.includes(lang)) {
                    document.documentElement.setAttribute("lang", lang)
                }
            })
        }

        if (document.documentElement.getAttribute("lang") === null) {
            document.documentElement.setAttribute("lang", "en-US")
        }

        await fetch(`/i18n/${document.documentElement.getAttribute("lang")}.json`).then(res => res.json()).then(json => {

            localeStrings = json
        })
    }

    locale() {
        return localeStrings
    }

    getPosts(uri: string, offset: number) {
        if (feedPosts.val.length == 0) {
            (async () => {
                const response = await Api(`${uri}?offset=${offset}&limit=${15}`);
		
                let json: IResponsePosts<IPost> = await response.json();

                let newProfiles = new Map<string, IProfile>()

                json.includes.users.forEach((profile) => {
                    newProfiles.set(profile.id, profile)
                })

                profiles.val = newProfiles
                feedPosts.val = json.data
            })()
        }
        

        return feedPosts
    }

    getProfileById(user_id: string) {
        const profile = profiles.val.get(user_id)

        if (!profile) {
            (async () => {
                // const response = await Api(`?offset=${offset}&limit=${15}`);
		
                // let json: IResponsePosts<IPost> = await response.json();

                // let newProfiles = new Map<string, IProfile>()

                // json.includes.users.forEach((profile) => {
                //     newProfiles.set(profile.id, profile)
                // })

                
            })()
        }

        return profile
    }

    getProfileByUsername(username: string) {
        for (const id in profiles.val.values()) {
            if (profiles.val.get(id)!.username === username) {
                return profiles.val.get(id)
            }
        }

        (async () => {
            const response = await Api(`users/getByUsername/${username}`);
    
            let json: IResponsePosts<IProfile> = await response.json();

            profiles.val.set(json.data[0].id, json.data[0])

            return json.data[0]


        })()
    }

    getFriends(offset: number) {
        if (friends.val.length == 0) {
            (async () => {
                const response = await Api(`friends/?offset=${offset}&limit=${15}`);
		
                let json: IResponsePosts<IProfile> = await response.json();

                friends.val = json.data
            })()
        }
        
        return friends
    }

    deleteFriend(id: string) {
        Api(`friends/${id}`, 'DELETE').then(response => {
            if (!response?.ok) {

            }
        })
    }

    addFriend(id: string) {
        Api(`friends/${id}`, 'POST').then(response => {
            if (!response?.ok) {

            }
        })
    }

}

export const store = new Store()