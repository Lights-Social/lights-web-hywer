import { For, Show, createEffect } from "solid-js";
import { Api } from "../../../components/api";
import { IResponsePosts, createInfiniteScroll } from "../../../components/createInfiniteScroll";
import { IProfile } from "../../../types/models";
import Cell from "../Cell";
import { Placeholder } from "../Cell/Placeholder";
interface SearchProps {
    onOpenUser: (username: string) => void;
    query: string;
}

function NotFoundPlaceholder() {

    return (
        <div class="emptyPlaceholder">
            <div class="title">
                Not found
            </div>
        </div>
    )
}

export default function Search(props: SearchProps) {
    async function fetchUsers(offset: number) {
		const response = await Api(`users/search/${encodeURIComponent(props.query)}?offset=${offset}&limit=${15}`);

		const data: IResponsePosts<IProfile> = await response?.json();
		
		return data;
	}

    const [users, includes, , forceReload, loading, { end, setItems: setComments }] = createInfiniteScroll<IProfile>(fetchUsers);

    createEffect(() => {
		if (props.query) {
			forceReload()
		}
	})

    return (
        <>
            <For each={users.posts} fallback={(users.posts[0] || end()) && <NotFoundPlaceholder />}>
                {(item) => (
                    <Cell type={"search"} item={item} onOpenUser={props.onOpenUser} />
                )}
            </For>
            <Show when={loading()}>
                <Placeholder />
            </Show>
        </>
        
    )
}