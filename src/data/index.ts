import { Api } from "@/api"
import type { IPost, IProfile, IResponsePosts } from "./types/models"
import { ref, type Reactive } from "hywer/jsx-runtime"
import { getCookieValue } from "@/ui/utils/getCookieValue"
import { ReactiveProfile } from "./ReactiveProfile"

const availableLangs = ["en-US", "uk"]

interface ILocale {
    [key: string]: string
}

interface IResponseSession {
    access_token: string;
    refresh_token: string;
}


const defaultProfile = {
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

export class Store {

    private strings: ILocale = {}
    private globalLang = "en-US"

    private friends = ref<IProfile[]>([])

    private myPosts = ref<IPost[]>([])

    private userPosts = ref<IPost[]>([])

    private feedPosts = ref<IPost[]>([])

    private accountProfile = ref<IProfile | null>(null)

    private profiles = ref<Map<string, IProfile>>(new Map())

    private usernames = ref<Map<string, string>>(new Map())



    auth = {
        requestCode: async (email: string) => {
            try {
                const response = await Api(`auth/code?email=${email}`, "POST");

                return response.ok
            } catch (error) {
                return false
            }
        },
        verifyCode: async (code: number, email: string) => {
            try {
                const response = await Api(`auth/verifyCode?code=${code}&email=${email}`, "POST");

                const tokens = await response.json() as IResponseSession

                if (!response.ok) {
                    return false
                }

                document.cookie = `access_token=${tokens.access_token}; expires=Thu, 01 Jan 2026 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
                document.cookie = `refresh_token=${tokens.refresh_token}; expires=Thu, 01 Jan 2026 00:00:00 UTC; path=/; domain=${window.location.hostname}`;

                return true;

            } catch (error) {
                return false
            }
        },
        isAuthorized: () => {
            let access_token = getCookieValue("access_token");
            return access_token != null;
        }
    }


    async setLocale(locale?: string) {

        if (locale) {
            document.documentElement.setAttribute("lang", locale)
            locale = locale
        } else {
            navigator.languages.forEach(lang => {
                if (availableLangs.includes(lang)) {
                    document.documentElement.setAttribute("lang", lang)
                    locale = lang
                }
            })
        }

        if (document.documentElement.getAttribute("lang") === null) {
            document.documentElement.setAttribute("lang", "en-US")

            locale = "en-US"
        }

        await fetch(`/i18n/${document.documentElement.getAttribute("lang")}.json`).then(res => res.json()).then(json => {

            this.strings = json
        })
    }


    locale() {
        return {strings: this.strings, locale: this.globalLang}
    }


    getPosts(uri: string, offset: number) {
        if (uri != "feeds/following") {
            this.userPosts.val = [];

            (async () => {
                const response = await Api(`${uri}?offset=${offset}&limit=${15}`);
		
                let json: IResponsePosts<IPost> = await response.json();

                json.includes.users.forEach((profile) => {
                    this.profiles.val.set(profile.id, profile)

                    this.usernames.val.set(profile.username, profile.id)

                })

                this.userPosts.val = json.data
            })()
        } else {
            if (this.feedPosts.val.length == 0) {
                (async () => {
                    const response = await Api(`${uri}?offset=${offset}&limit=${15}`);
            
                    let json: IResponsePosts<IPost> = await response.json();
    
                    json.includes.users.forEach((profile) => {
                        this.profiles.val.set(profile.id, profile)
                        this.usernames.val.set(profile.username, profile.id)
                    })
    
                    this.feedPosts.val = json.data
                })()
            }
        }

        

        return uri != "feeds/following" ? this.userPosts : this.feedPosts 
    }

    getProfileById(user_id: string) {
        const profile = this.profiles.val.get(user_id)

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

    async getProfileByUsername(username: string): Promise<ReactiveProfile | null> {

        let user

        let user_id = this.usernames.val.get(username)

        let profile: IProfile | undefined

        if (user_id) {
            profile = this.profiles.val.get(user_id)

            user = new ReactiveProfile(profile!)
            return user
        }



        const response = await Api(`users/getByUsername/${username}`);
    
        let json: IResponsePosts<IProfile> = await response.json();

        this.profiles.val.set(json.data[0].id, json.data[0])
        this.usernames.val.set(json.data[0].username, json.data[0].id)

        user = new ReactiveProfile(json.data[0])

        return user
    }

    getFriends(offset: number) {
        if (this.friends.val.length == 0) {
            (async () => {
                const response = await Api(`friends/?offset=${offset}&limit=${15}`);
		
                let json: IResponsePosts<IProfile> = await response.json();


                json.data.forEach((profile) => {
                    this.profiles.val.set(profile.id, profile)
                    this.usernames.val.set(profile.username, profile.id)
                })

                this.friends.val = json.data
            })()
        }
        
        return this.friends
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

    editNote(user_id: string, text: string) {
        Api(`notes/${user_id}?text=${text}`, 'PATCH').then(response => {
            if (!response?.ok) {
            }
        }).catch(() => {

        });
    }

}

export const store = new Store()