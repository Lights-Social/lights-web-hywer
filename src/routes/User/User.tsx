import Post from "@/ui/Post/Post"
import PostPlaceholder from "@/ui/Post/Placeholder";
import { store } from "@/data";
import Profile from "./Profile/Profile";
import "./styles.css"
import CategorySlider from "./CategorySlider/CategorySlider";
import { ref } from "hywer/jsx-runtime";

interface UserProps {
    username: string
}
function User({username}: UserProps) {
    const posts = store.getPosts(`users/getByUsername/${username}/wall`, 0)

    const profile = store.getProfileByUsername(username)

    console.log(profile)

    const activeTab = ref("posts");

	function selectTab(tab: string) {

		if (tab == "moments") {
			activeTab.val = tab;

			activeTab.val = "posts";

		}
	}

    return <>
        <main class="userView">
            {profile == null ? null : <Profile profile={profile} />}
            <div class="items">
                {profile == null ? null : <CategorySlider onSelectTab={selectTab} tab={activeTab.val} posts={profile.posts} moments={profile.moments}/>}
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