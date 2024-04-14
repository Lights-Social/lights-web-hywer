import Post from "@/ui/Post/Post"
import PostPlaceholder from "@/ui/Post/Placeholder";
import { store } from "@/data";
import Profile from "./Profile/Profile";
import "./styles.css"
import CategorySlider from "./CategorySlider/CategorySlider";
import { ref } from "hywer/jsx-runtime";
import { future } from "hywer/x/future";
import type { IProfile } from "@/data/types/models";
import { ReactiveProfile } from "@/data/ReactiveProfile";
import Placeholder from "./Profile/Placeholder";

interface UserProps {
    username: string
}
function User({username}: UserProps) {
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


    const pr = new ReactiveProfile(defaultProfile)



    const profile = future(async () => store.getProfileByUsername(username), pr)

    const posts = store.getPosts(`users/getByUsername/${username}/wall`, 0)

    const activeTab = ref("posts");

	function selectTab(tab: string) {

		if (tab == "moments") {
			activeTab.val = tab;

			activeTab.val = "posts";

		}
	}

    return <>
        <main class="userView">
            {
                profile.derive((val) => {
                    if (val) {
                        return <>{val.get().val.id == "" ? <Placeholder /> : <Profile profile={val.get().val} />}</>
                    }
                })
            }
            <div class="items">
                {
                    profile.derive((val) => {
                        if (val) {
                            return <>{val.get().val.id == "" ? null : <CategorySlider onSelectTab={selectTab} tab={activeTab.val} posts={val.get().val.posts} moments={val.get().val.moments}/>}</>
                        }
                    })
                }
                <div class="postsList">
                    {
                        posts.derive(val => val.length == 0 ? <PostPlaceholder /> : <div style="display: none"></div>)
                    }
                    {posts.derive(val => {
                        return val.map(post => {
                            return <Post
                                post={post}
                                profile ={store.getProfileById(post.peer.id)!}
                            />
                        })
                    })}
                </div>
            </div>
        </main>
    	
    </>
}

export default User