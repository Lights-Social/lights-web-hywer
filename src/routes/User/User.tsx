import { store } from "@/data";
import Profile from "./Profile/Profile";
import "./styles.css"
import CategorySlider from "./CategorySlider/CategorySlider";
import { derive, ref } from "hywer/jsx-runtime";
import { future } from "hywer/x/future";
import { ReactiveProfile } from "@/data/ReactiveProfile";
import Placeholder from "./Profile/Placeholder";
import {PostsList} from "@/ui/PostsList/PostsList";
import { showUserNotFoundModal } from "./UserNotFoundModal";
import { openModal } from "@/ui/Modal/Modal";
import PostEditor from "./PostEditor";
import { navigateTo } from "hywer/x/router";

interface UserProps {
    username: string
}


// } else {
//     navigateTo(`/home`)

//     setTimeout(() => {
//         showUserNotFoundModal(username)
//     })
// }

function User({username}: UserProps) {

    const user_id = store.auth.user_id()


    const {user, state} = store.getProfileByUsername(username)
    const profile = user.get()

    const activeTab = ref("posts");

	function selectTab(tab: string) {

		if (tab == "moments") {
            openModal("momentsErrorModal", [7,7,7,7], false);
			activeTab.val = tab;

			activeTab.val = "posts";
            return
		}

        activeTab.val = tab;
	}

    return <>
        <main class="userView">
            {
                state.derive((val) => {
                    return <>{val != "success" ? <Placeholder /> : <Profile profile={profile} />}</>
                })
            }
            <div class="items">
                {/* {
                    profile.derive((val) => {
                        return <>{val.id == "" ? null : <CategorySlider profile={val} onSelectTab={selectTab} tab={activeTab} posts={val.posts} moments={val.moments}/>}</>
                    })
                } */}
                {/* {
                    derive(([tab, profileData]) => {
                        if (tab.val == "posts" && profileData.val.id == user_id) {
                            return <PostEditor type="create"/>
                        } else {
                            return <div style="display: none;" />
                        }
                    }, [activeTab, profile])

                } */}

                {
                    derive(([tab]) => {
                        switch (tab.val) {
                            case "posts":
                                return <div class="userPosts">
                                    <PostsList uri={`users/getByUsername/${username}/wall`} />
                                </div>
                            case "favorites":
                                return <div class="userPosts">
                                    <PostsList uri={`favorites/posts`} />
                                </div>
                            }
                    }, [activeTab])
                }
            </div>
        </main>
    </>
}

export default User