import { store } from "@/data";
import Profile from "./Profile/Profile";
import "./styles.css"
import CategorySlider from "./CategorySlider/CategorySlider";
import { derive, effect, ref } from "hywer/jsx-runtime";
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

    effect(() => {
        if (state.val == "error") {
            navigateTo(`/home`)

            setTimeout(() => {
                showUserNotFoundModal(username)
            })
        }
    }, [state])

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

    effect(([newUsername]) => {
        history.replaceState(null, "", `/u/${newUsername.val}`)
    }, [profile.username])

    return <>
        <main class="userView">
            {
                state.derive((val) => {
                    return <>{val != "success" ? <Placeholder /> : <Profile profile={profile} />}</>
                })
            }
            <div class="items">
                {
                    state.derive((val) => {
                        return <>{val != "success" ? <div style="display: none;" /> : <CategorySlider profile={profile} onSelectTab={selectTab} tab={activeTab}/>}</>
                    })
                }
                {
                    derive(([tab, profileId]) => {
                        if (tab.val == "posts" && profileId.val == user_id) {
                            return <PostEditor type="create"/>
                        } else {
                            return <div style="display: none;" />
                        }
                    }, [activeTab, profile.id])

                }

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