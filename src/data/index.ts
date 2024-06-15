import { Api } from "@/api"
import type { IAudio, IComment, IFriend, IPost, IProfile, IResponsePosts, LightsDB } from "./types/models"
import { derive, ref, type Reactive } from "hywer/jsx-runtime"
import { getCookieValue } from "@/ui/utils/getCookieValue"
import { ReactiveProfile, emptyProfile } from "./ReactiveProfile"
import { ReactivePost, emptyPost } from "./ReactivePost"

import { openDB, type IDBPDatabase } from 'idb';
import { hashCode } from "@/ui/utils/hash"
import { ReactiveComment } from "./ReactiveComment"

const availableLangs = ["en-US", "uk"]

interface ILocale {
    [key: string]: string
}

interface IResponseSession {
    access_token: string;
    refresh_token: string;
}


function createObjectStores(db: IDBPDatabase<LightsDB>) {
    if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', {
            keyPath: ['id'],
        });
        userStore.createIndex('by-id', 'id', {unique: true});
        userStore.createIndex('by-username', 'username', {unique: true});
    }

    if (!db.objectStoreNames.contains('posts')) {
        const postStore = db.createObjectStore('posts', {
            keyPath: ['id'],
        });
        postStore.createIndex('by-post-id', 'id', {unique: true});
    }

    if (!db.objectStoreNames.contains('comments')) {
        const commentStore = db.createObjectStore('comments', {
            keyPath: ['id'],
        });
        commentStore.createIndex('by-comment-id', 'id', {unique: true});
    }

    if (!db.objectStoreNames.contains('translations')) {
        const translationStore = db.createObjectStore('translations', {
            keyPath: ['hash'],
        });
        translationStore.createIndex('by-hash', 'hash', {unique: true});
    }
}

export class Store {

    private strings: ILocale = {}
    private globalLang = "en-US"

    private comments = {
        items: new Map<string, ReactiveComment>(),
    }

    private posts = {
        items: new Map<string, ReactivePost>(),
        lists: {
            users: new Map<string, string[]>(),
            feed: ref<string[]>([]),
            favorites: ref<string[]>([]),
        }
    }

    private profiles = new Map<string, ReactiveProfile>()
    private usernames = new Map<string, string>()

    private friends = ref<string[]>([])


    private user_id: string | null = null

    private db: IDBPDatabase<LightsDB> | null = null

    async init() {
        this.db = await openDB<LightsDB>('lights-web', 5, {
            upgrade(db, oldVersion, newVersion, transaction, event) {   
                createObjectStores(db)
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

        createObjectStores(this.db)


        globalThis.getGlobalProfile = this.profiles;
        globalThis.getGlobalPost = this.posts.items;

        const response = await Api(`users/getByUsername/@me`)
        if (!response.ok) {
            return null
        }

        let json: IResponsePosts<IProfile> = await response.json();

        this.user_id = json.data[0].id

        this.db?.put('users', json.data[0])

        //await this.fetchProfile('@me', 'username', new ReactiveProfile(json.data[0]), ref("success"))
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
        posts: Reactive<ReactivePost[]>;
        state: Reactive<string>;
    }) {
        const offset = list.val.length;

        const response = await Api(`${uri}?offset=${offset}&limit=${15}`);


        if (!response.ok) {
            return null
        }
            
        let json: IResponsePosts<IPost> = await response.json();

        json.includes.users.forEach((profile) => {

            this.db?.put('users', profile).then((lol) => {

                let user = this.profiles.get(profile.id)

                if (!user) {
                    user = new ReactiveProfile(emptyProfile)
                    this.profiles.set(profile.id, user)
                    this.usernames.set(profile.username, profile.id)
                } else {
                    user.profile = profile
                }


            })
        })


        json.data.forEach((post) => {
            this.db?.put('posts', post)

            let postObject = this.posts.items.get(post.id)

            if (!postObject) {
                postObject = new ReactivePost(post)
                this.posts.items.set(post.id, postObject)
            } else {
                postObject.post = post
            }

            list.val.push(post.id)


            if (post.reposts.initialPosts) {
                post.reposts.initialPosts.forEach((initialPost) => {
                    this.db?.put('posts', initialPost)
    
                    let postObject = this.posts.items.get(initialPost.id)
    
                    if (!postObject) {
                        this.posts.items.set(initialPost.id, new ReactivePost(initialPost))
                    } else {
                        postObject.post = initialPost
                    }
                })
            }
            
        })

        const filteredObjects = list.val
        .filter(id => this.posts.items.has(id))
        .map(id => this.posts.items.get(id)) as ReactivePost[]

        container.posts.val = [...container.posts.val, ...filteredObjects]
    }


    getPosts(uri: string) {

        let container: {
            posts: Reactive<ReactivePost[]>;
            state: Reactive<string>;
        } = {
            posts: ref<ReactivePost[]>([]),
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
            .map(id => this.posts.items.get(id)) as ReactivePost[]

            container.posts.val = [...container.posts.val, ...filteredObjects]

        }, [list])

        // else if (uri == `users/getByUsername/${this.profiles.val.get(this.user_id!)?.username}/wall`) {            

        // }

        if (list.val.length == 0) {
            this.fetchPosts(uri, list, container)
        }

        
        const next = () => this.fetchPosts(uri, list, container)

        return {container, next}
    }

    getComments(post_id: string) {
        let container: {
            comments: Reactive<ReactiveComment[]>;
            state: Reactive<string>;
        } = {
            comments: ref<ReactiveComment[]>([]),
            state: ref('pending')
        }

        let list = ref<string[]>([])


        derive(([newList]) => {
            const filteredObjects = newList.val
            .filter(id => this.comments.items.has(id))
            .map(id => this.comments.items.get(id)) as ReactiveComment[]

            container.comments.val = [...container.comments.val, ...filteredObjects]

        }, [list])

        // else if (uri == `users/getByUsername/${this.profiles.val.get(this.user_id!)?.username}/wall`) {            

        // }

        if (list.val.length == 0) {
            this.fetchComments(post_id, list, container)
        }

        const next = () => this.fetchComments(post_id, list, container)

        return {container, next}
    }

    private async fetchComments(post_id: string, list: Reactive<string[]>, container: {
        comments: Reactive<ReactiveComment[]>;
        state: Reactive<string>;
    }) {
        const offset = list.val.length;

        const response = await Api(`posts/${post_id}/comments?offset=${offset}&limit=${15}`);


        if (!response.ok) {
            return null
        }
            
        let json: IResponsePosts<IComment> = await response.json();

        json.includes.users.forEach((profile) => {

            this.db?.put('users', profile).then((lol) => {

                let user = this.profiles.get(profile.id)

                if (!user) {
                    user = new ReactiveProfile(emptyProfile)
                    this.profiles.set(profile.id, user)
                    this.usernames.set(profile.username, profile.id)
                } else {
                    user.profile = profile
                }


            })
        })


        json.data.forEach((comment) => {
            this.db?.put('comments', comment).then((lol) => {
                //console.log("post saved", lol)
            })

            let commentObject = this.comments.items.get(comment.id)

            if (!commentObject) {
                commentObject = new ReactiveComment(comment)
                this.comments.items.set(comment.id, commentObject)
            } else {
                commentObject.comment = comment
            }

            list.val.push(comment.id)
        })

        const filteredObjects = list.val
        .filter(id => this.comments.items.has(id))
        .map(id => this.comments.items.get(id)) as ReactiveComment[]

        container.comments.val = [...container.comments.val, ...filteredObjects]
    }


    async getTranslation(text: string, id: string, type: string, language: string) {
        const hash = hashCode(text+language)

        const translation = await this.db?.getFromIndex('translations', 'by-hash', hash)

        if (translation) {
            return translation.text
        }

        const response = await Api(`${type == 'post' ? 'posts' : 'comments'}/${id}/translation?language=${language}`)
        const data = await response.json()

        if (response.ok) {
            this.db?.put('translations', {
                text: data.text,
                hash: hash
            })
        }
        

        return data.text
    }

    sendPost(text: string) {


        //this.myPosts.posts.val.unshift(item)
    }

    async fetchPost(post_id: string, post: ReactivePost, state: Reactive<string>) {
        const idbresp = await this.db?.getFromIndex('posts', 'by-post-id', post_id)

        if (idbresp) {
            post.post = idbresp
            state.val = 'success'

            this.posts.items.set(post_id, post)
            return
        }

        const response = await Api(`posts/${post_id}`)
        if (!response.ok) {
            state.val = 'error'
            return null
        }

        let json: IResponsePosts<IPost> = await response.json();

        this.db?.put('posts', json.data[0])

        post.post = json.data[0]
        //this.posts.items.set(post_id, post)
        if (json.data[0].reposts.initialPosts) {

            json.data[0].reposts.initialPosts.forEach((initialPost) => {
                this.db?.put('posts', initialPost)

                let postObject = this.posts.items.get(initialPost.id)

                if (!postObject) {
                    this.posts.items.set(initialPost.id, new ReactivePost(initialPost))
                } else {
                    postObject.post = initialPost
                }
            })

        }

        json.includes.users.forEach((profile) => {

            this.db?.put('users', profile).then((lol) => {

                let user = this.profiles.get(profile.id)

                if (!user) {
                    user = new ReactiveProfile(emptyProfile)
                    this.profiles.set(profile.id, user)
                    this.usernames.set(profile.username, profile.id)
                } else {
                    user.profile = profile
                }


            })
        })
        
        
        state.val = 'success'
    }

    async fetchProfile(query: string, index: string, user: ReactiveProfile, state: Reactive<string>) {
        const idbresp = await this.db?.getFromIndex('users', index == 'username' ? 'by-username' : 'by-id', query)

        if (idbresp) {
            user.profile = idbresp
            state.val = 'success'

            this.usernames.set(idbresp.username, idbresp.id)
            this.profiles.set(idbresp.id, user)
            return
        }

        
        const response = await Api(`users/${index == 'username' ? 'getByUsername' : 'getById'}/${query}`)
        if (!response.ok) {
            state.val = 'error'
            return null
        }

        let json: IResponsePosts<IProfile> = await response.json();

        if (query == '@me' && index == 'getByUsername') {
            this.user_id = json.data[0].id
        }

        this.db?.put('users', json.data[0])

        user.profile = json.data[0]
        this.usernames.set(json.data[0].username, json.data[0].id)
        //this.profiles.set(json.data[0].id, user)
        
        
        state.val = 'success'
    }
    
    getProfileById(user_id: string) {
        const state = ref('pending')

        let user = this.profiles.get(user_id)

        if (!user) {
            let tempUser = new ReactiveProfile(emptyProfile)
            user = this.profiles.set(user_id, tempUser).get(user_id)!

            this.fetchProfile(user_id, 'id', tempUser, state)
        } else {
            state.val = 'success'
        }

        return {user, state}
    }

    getPost(post_id: string) {
        const state = ref('pending')

        let post = this.posts.items.get(post_id)

        if (!post) {
            let tempPost = new ReactivePost(emptyPost)
            post = this.posts.items.set(post_id, tempPost).get(post_id)!

            this.fetchPost(post_id, tempPost, state)
        } else {
            state.val = 'success'
        }

        return {post, state}
    }

    getProfileByUsername(username: string) {
        const state = ref('pending')

        const user_id = this.usernames.get(username)
        let user = this.profiles.get(user_id!)

        if (!user) {
            user = new ReactiveProfile(emptyProfile)            
            this.fetchProfile(username, 'username', user, state)
        } else {
            state.val = 'success'
        }


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


    private async fetchProfiles(uri: string, list: Reactive<string[]>, container: {
        users: Reactive<ReactiveProfile[]>;
        state: Reactive<string>;
    }) {
        const offset = list.val.length;

        const response = await Api(`${uri}?offset=${offset}&limit=${15}`);


        if (!response.ok) {
            return null
        }
            
        let json: IResponsePosts<IProfile> = await response.json();

        json.data.forEach((profile) => {
            this.db?.put('users', profile)

            let profileObject = this.profiles.get(profile.id)

            if (!profileObject) {
                profileObject = new ReactiveProfile(profile)
                this.profiles.set(profile.id, profileObject)
            } else {
                profileObject.profile = profile
            }

            list.val.push(profile.id)
        })

        const filteredObjects = list.val
        .filter(id => this.profiles.has(id))
        .map(id => this.profiles.get(id)) as ReactiveProfile[]

        container.users.val = [...container.users.val, ...filteredObjects]

        container.state.val = 'success'
    }

    getFriends() {

        let container: {
            users: Reactive<ReactiveProfile[]>;
            requests: {
                incoming: number
                outgoing: number
            }
            state: Reactive<string>;
        } = {
            users: ref<ReactiveProfile[]>([]),
            requests: {
                incoming: 0,
                outgoing: 0
            },
            state: ref('pending')
        }

        derive(([newList]) => {
            const filteredObjects = newList.val
            .filter(id => this.profiles.has(id))
            .map(id => this.profiles.get(id)) as ReactiveProfile[]

            container.users.val = [...container.users.val, ...filteredObjects]


        }, [this.friends])


        if (this.friends.val.length == 0) {
            this.fetchProfiles('friends/', this.friends, container)
        }

        
        const next = () => this.fetchProfiles('friends/', this.friends, container)

        return {container, next}
    }


    searchUsers(query: string) {

        let container: {
            users: Reactive<ReactiveProfile[]>;
            state: Reactive<string>;
        } = {
            users: ref<ReactiveProfile[]>([]),
            state: ref('pending')
        }

        let list = ref<string[]>([])


        derive(([newList]) => {
            const filteredObjects = newList.val
            .filter(id => this.profiles.has(id))
            .map(id => this.profiles.get(id)) as ReactiveProfile[]

            container.users.val = [...container.users.val, ...filteredObjects]


        }, [list])


        if (list.val.length == 0) {
            this.fetchProfiles(`users/search/${encodeURIComponent(query)}/`, list, container)
        }

        
        const next = () => this.fetchProfiles(`users/search/${encodeURIComponent(query)}/`, list, container)

        return {container, next}
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

            const profile = this.profiles.get(user_id)

            if (profile) {
                profile.note = text

                //this.db?.put('users', profile.get())
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

                this.db?.delete('posts', id)

                //--this.profiles.get(this.user_id!)!.posts

            }
		}).catch(() => {

		});


    }
    

}

export const store = new Store()