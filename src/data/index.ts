import { Api } from "@/api"
import type { IAudio, IFriend, IPost, IProfile, IResponsePosts, LightsDB } from "./types/models"
import { derive, ref, type Reactive } from "hywer/jsx-runtime"
import { getCookieValue } from "@/ui/utils/getCookieValue"
import { ReactiveProfile } from "./ReactiveProfile"
import { ReactivePost } from "./ReactivePost"

import { openDB, deleteDB, wrap, unwrap, type IDBPDatabase } from 'idb';
import { hashCode } from "@/ui/utils/hash"


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

    private posts = {
        items: new Map<string, IPost>(),
        lists: {
            users: new Map<string, string[]>(),
            feed: ref<string[]>([]),
            favorites: ref<string[]>([]),
        }
    }

    private friends: IFriend[] = []

    private user_id: string | null = null

    private db: IDBPDatabase<LightsDB> | null = null

    async init() {
        this.db = await openDB<LightsDB>('lights-web', 2, {
            upgrade(db, oldVersion, newVersion, transaction, event) {
                const userStore = db.createObjectStore('users', {
                    keyPath: ['id'],
                });
                

                userStore.createIndex('by-id', 'id', {unique: true});
                userStore.createIndex('by-username', 'username', {unique: true});

                const postStore = db.createObjectStore('posts', {
                    keyPath: ['id'],
                });

                postStore.createIndex('by-post-id', 'id', {unique: true});

                const translationStore = db.createObjectStore('translations', {
                    keyPath: ['hash'],
                });

                translationStore.createIndex('by-hash', 'hash', {unique: true});

                //console.log('upgrade', oldVersion, newVersion, transaction, event);




            },
            blocked(currentVersion, blockedVersion, event) {
              console.log('blocked', currentVersion, blockedVersion, event);
            },
            blocking(currentVersion, blockedVersion, event) {
              console.log('blocking', currentVersion, blockedVersion, event);
            },
            terminated() {
              console.log('terminated');
            },
        });
    }

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
        },
        user_id: () => {
            return this.user_id
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

    private async fetchPosts(uri: string, list: Reactive<string[]>, container: {
        posts: Reactive<IPost[]>;
        state: Reactive<string>;
    }) {
        const offset = list.val.length;

        

        // if (!navigator.onLine) {
        //     list.state.val = 'errored'

        //     return null
        // }

        const response = await Api(`${uri}?offset=${offset}&limit=${15}`);


        if (!response.ok) {
            return null
        }
            
        let json: IResponsePosts<IPost> = await response.json();

        json.includes.users.forEach((profile) => {

            this.db?.put('users', profile).then((lol) => {
                console.log("profile saved", lol)
            })
        })


        json.data.forEach((post) => {
            this.db?.put('posts', post).then((lol) => {
                console.log("post saved", lol)
            })

            this.posts.items.set(post.id, post)
            list.val.push(post.id)
        })

        const filteredObjects = list.val
        .filter(id => this.posts.items.has(id))
        .map(id => this.posts.items.get(id)) as IPost[]

        container.posts.val = [...container.posts.val, ...filteredObjects]
    }


    getPosts(uri: string) {

        let container: {
            posts: Reactive<IPost[]>;
            state: Reactive<string>;
        } = {
            posts: ref<IPost[]>([]),
            state: ref('pending')
        }

        let list = ref<string[]>([])

        if (uri == 'feeds/following') {
            list = this.posts.lists.feed
        } else if (uri == 'favorites/posts') {
            list = this.posts.lists.favorites
        } else {
            
        }

        derive(([newList]) => {
            const filteredObjects = newList.val
            .filter(id => this.posts.items.has(id))
            .map(id => this.posts.items.get(id)) as IPost[]

            container.posts.val = [...container.posts.val, ...filteredObjects]

        }, [list])

        // else if (uri == `users/getByUsername/${this.profiles.val.get(this.user_id!)?.username}/wall`) {            

        // }

        if (list.val.length == 0) {
            this.fetchPosts(uri, list, container)
        } else {
            const filteredObjects = list.val
            .filter(id => this.posts.items.has(id))
            .map(id => this.posts.items.get(id)) as IPost[]

            container.posts.val = [...container.posts.val, ...filteredObjects]

        }

        
        const next = () => this.fetchPosts(uri, list, container)

        return {container, next}
    }


    async getTranslation(text: string, id: string, language: string) {
        const hash = hashCode(text+language)

        const translation = await this.db?.getFromIndex('translations', 'by-hash', hash)

        if (translation) {
            return translation.text
        }

        const response = await Api(`posts/${id}/translation?language=${language}`)
        const data = await response.json()


        //this.postTranslations.set(id, data.text)

        this.db?.put('translations', {
            text: data.text,
            hash: hash
        })

        return data.text
    }

    sendPost(text: string) {


        let item: IPost = {
            id: "",
            access: "all",
            is_edited: false,
            is_pinned: false,
            text: text,
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
                id: this.user_id!,
                type: "user",
            },
            reposts: {
                count: 0,
                objects: [],
                initialPosts: [],
            },
            is_favorite: false
        }


        //this.myPosts.posts.val.unshift(item)
    }


    async getPost(post_id: string) {

        let post = this.posts.items.get(post_id)

        console.log(post)

        if (post) {
            return new ReactivePost(post)
        }

        
        const response = await Api(`posts/${post_id}`);

        if (!response.ok) {
            return null
        }
    
        let json: IResponsePosts<IPost> = await response.json();


        json.includes.users.forEach((profile) => {
            this.db?.put('users', profile).then((lol) => {
                console.log("profile saved", lol)
            })
        })


        this.posts.items.set(json.data[0].id, json.data[0])

        post = json.data[0]

        return new ReactivePost(post)
    }
    
    getProfileById(user_id: string) {
        const user = new ReactiveProfile(defaultProfile)
        const state = ref('pending')

        // if (!navigator.onLine && user_id == this.user_id) {
        //     return user = new ReactiveProfile(defaultProfile)
        // }

        this.db?.getFromIndex('users', 'by-id', user_id).then((profile) => {
            if (profile) {
                user.profile = profile
            }            
        })



        return {user, state}
    }

    getProfileByUsername(username: string) {
        const user = new ReactiveProfile(defaultProfile)
        const state = ref('pending')

        this.db?.getFromIndex('users', 'by-username', username).then((profile) => {
            if (profile) {
                user.profile = profile
            }            
        })


        if (!navigator.onLine && username == '@me') {
            this.user_id = defaultProfile.id


            //return user = new ReactiveProfile(defaultProfile!)
        }



        Api(`users/getByUsername/${username}`).then(async (response) => {
            if (!response.ok) {
                return null
            }

            let json: IResponsePosts<IProfile> = await response.json();
    
            if (username == '@me') {
                this.user_id = json.data[0].id
            }
    
            this.db?.put('users', json.data[0]).then((lol) => {
                console.log("profile saved", lol)
            })

            user.profile = json.data[0]
            state.val = 'success'
        });

        
        return {user, state}
    }

    async addFavoritePost(post_id: string) {
        Api(`favorites/posts/${post_id}/`, 'POST').then(() => {

            let post = this.posts.items.get(post_id)!
            post.is_favorite = true

            this.posts.items.set(post_id, post)
            this.posts.lists.favorites.val.unshift(post_id)
        })
    }

    async removeFavoritePost(post_id: string) {

        Api(`favorites/posts/${post_id}/`, 'DELETE').then(() => {

            let post = this.posts.items.get(post_id)!
            post.is_favorite = false

            this.posts.items.set(post_id, post)
        
            this.posts.lists.favorites.val = this.posts.lists.favorites.val.filter((item) => item != post_id)
        })
    }

    getFriends(offset: number) {
        let container: {
            users: Reactive<IProfile[]>;
            state: Reactive<string>;
        } = {
            users: ref<IProfile[]>([]),
            state: ref('pending')
        }

        if (this.friends.length == 0) {
            (async () => {
                const response = await Api(`friends/?offset=${offset}&limit=${15}`);
		
                let json: IResponsePosts<IProfile> = await response.json();


                json.data.forEach((profile) => {
                    this.db?.put('users', json.data[0]).then((lol) => {
                        console.log("profile saved", lol)
                    })

                    this.friends.push({id: profile.id, is_pinned: false})
                })

                // this.db?.getAll('users').then((users) => {
                //     this.friends
                //     .filter(profile => users.has(profile.id))
                //     .map(profile => this.profiles.get(profile.id)) as IProfile[]
                // })

                // const filteredObjects = this.friends
                // .filter(profile => this.profiles.has(profile.id))
                // .map(profile => this.profiles.get(profile.id)) as IProfile[]

                //container.users.val = [...container.users.val, ...filteredObjects]


                //this.friends.val = json.data
            })()
        } else {
            // const filteredObjects = this.friends
            // .filter(profile => this.profiles.has(profile.id))
            // .map(profile => this.profiles.get(profile.id)) as IProfile[]

            // container.users.val = [...container.users.val, ...filteredObjects]
        }
        
        return container
    }

    searchUsers(query: string, offset: number) {
        if (this.friends.length == 0) {
            (async () => {
                const response = await Api(`users/search/${encodeURIComponent(query)}/?offset=${offset}&limit=${15}`);
		
                let json: IResponsePosts<IProfile> = await response.json();


                // json.data.forEach((profile) => {
                //     this.profiles.set(profile.id, profile)
                //     this.usernames.set(profile.username, profile.id)

                    
                // })

                //this.friends.val = json.data
            })()
        }
        
        return this.friends
    }

    async deleteFriend(id: string) {
        const response = await Api(`friends/${id}`, 'DELETE')

        if (!response?.ok) {
            return false
        } else {
            return true
        }
    }

    async addFriend(id: string) {
        const response = await Api(`friends/${id}`, 'POST')

        if (!response?.ok) {
            return false
        } else {
            return true
        }
    }

    editNote(user_id: string, text: string) {
        Api(`notes/${user_id}?text=${text}`, 'PATCH').then(response => {
            if (!response?.ok) {
            }
        }).catch(() => {

        });
    }

    private tracks = ref<IAudio[]>([])
    private tracks_query = ""


    private async fetchTracks() {
        const offset = this.tracks.val.length > 0 ? this.tracks.val.length+15 : 0;
        const response = await Api(`tracks/${encodeURIComponent(this.tracks_query)}?offset=${offset}&limit=${15}`);
            
        let json: IResponsePosts<IAudio> = await response.json();

        this.tracks.val = [...this.tracks.val, ...json.data]
    }


    getTracks(query: string) {
        if (this.tracks_query != query) this.tracks.val = []
        this.tracks_query = query


        if (this.tracks.val.length == 0) {
            this.fetchTracks()
        }

        
        const next = () => this.fetchTracks()

        return {tracks: this.tracks, next}
    }


    deletePost(id: string) {

        Api(`posts/${id}/`, 'DELETE').then((response) => {
            if (response.ok) {

                this.posts.lists.favorites.val = this.posts.lists.favorites.val.filter((post) => post != id)
            
                this.posts.items.delete(id)

                this.db?.delete('posts', id).then((lol) => {
                    console.log("post deleted", lol)
                })

            }
		}).catch(() => {

		});


    }
    

}

export const store = new Store()