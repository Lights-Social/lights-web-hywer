import { useI18n } from "@solid-primitives/i18n";
import { createMediaQuery } from "@solid-primitives/media";
import { For, Show } from "solid-js";
import { MobileHeader } from "../../../components/MobileHeader";
import { Api } from "../../../components/api";
import { IResponsePosts, createInfiniteScroll } from "../../../components/createInfiniteScroll";
import { IProfile } from "../../../types/models";
import Cell from "../Cell";
import { useNavigate, useParams } from "@solidjs/router";

export default function FriendRequests() {
    const [t] = useI18n();
    const navigate = useNavigate();
	const isPhone = createMediaQuery("(max-width: 480px)")
    const params = useParams();
    
    const type = () => params?.type ? params.type : "incoming"

    async function fetchUsers(offset: number) {
		const response = await Api(`friends/requests/${type()}?offset=${offset}&limit=${15}`);

		const data: IResponsePosts<IProfile> = await response?.json();
		
		return data;
	}

    const [users, includes, , forceReload, loading, { end, setItems }] = createInfiniteScroll<IProfile>(fetchUsers);
    
    function goNavigateProfile(username: string) {
        navigate(`/u/${username}`, { replace: false, state: users.posts.find((item) => item.username == username) })
    }

    async function showUserModal(username: string) {
		
        if (!document.startViewTransition) {
            goNavigateProfile(username);
            return;
        }

        document.startViewTransition(() => goNavigateProfile(username));
        
    }

    function deleteFriendRequest(id: string) {

		setItems('posts', prev => prev.filter(item => item.id !== id));
    }

    return (
        <>
            <Show when={isPhone()}>
                <MobileHeader>
                    <span class="title">{t("friendRequests")}</span>
                </MobileHeader>
            </Show>
            <main class="friendsView">
                <div class="window">
                    <div class="friendList">
                        <For each={users.posts} fallback={(users.posts[0] || end()) && <>You haven't received any friend requests</>}>
                            {(item) => (
                                <Cell onDelete={deleteFriendRequest} type={"incoming"} item={item} onOpenUser={showUserModal} />
                            )}
                        </For>
                    </div>
                </div>
            </main>
        </>
    )
}