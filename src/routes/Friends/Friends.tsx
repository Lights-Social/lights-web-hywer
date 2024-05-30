//import { MobileHeader } from "../../components/MobileHeader";

import './styles.css';
import Cell from "./Cell";
//import Search from "./Search";
import { Placeholder } from "./Cell/Placeholder";
import { store } from "@/data";
import { MobileHeader } from '@/ui/MobileHeader/MobileHeader';

export default function Friends() {

    // const [searchQuery, setSearchQuery] = createSignal<string>();

    const {strings} = store.locale()    



    function onInputQuery(e: InputEvent) {
        const text = e.data!.trim()

        if (text !== '') {
            //setSearchQuery(text)

        } else {

            //setSearchQuery()
        }
    }

    const friends = store.getFriends(0)


    return <>
        <MobileHeader>
            <span class="title">{strings["friends"]}</span>
        </MobileHeader>
        <main class="friendsView">
            <div class="window">
                <input id="searchField" enterkeyhint="search" placeholder={strings["search"]} onInput={onInputQuery} type="text" />
                
                {
                    <div class="friendList">
                        {
                            friends.users.derive(val => val.length == 0 ? <Placeholder /> : <div style="display: none"></div>)
                        }
                        {friends.users.derive(val => {
                            return val.map(item => {
                                return <Cell type={"friend"} item={item} />
                            })
                        })}
                    </div>
                }

                
                {/* <Switch>
                    <Match when={!searchQuery()}>
                        <Show when={includes().requests && (includes().requests!.incoming > 0 || includes().requests!.outgoing > 0)}>
                            <button class="friendRequests" onClick={() => navigate("/friends/requests")}>
                                <div class="title">
                                    <svg viewBox="0 0 48 43" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18 19.9921C17.8673 19.9974 17.734 20 17.6001 20C12.0772 20 7.6001 15.5228 7.6001 10C7.6001 4.47715 12.0772 0 17.6001 0C22.438 0 26.4735 3.43552 27.4001 8H24.6C20.8601 8 18 11.0808 18 14.6667V19.9921ZM18 23.007C17.8339 23.0023 17.6672 23 17.5 23C7.83501 23 0 30.835 0 40.5C0 41.8807 1.11929 43 2.5 43H32.5C33.8807 43 35 41.8807 35 40.5C35 38.9442 34.797 37.4359 34.416 36H24.6C20.8601 36 18 32.9192 18 29.3333V23.007Z" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M48 15.7057L35.1331 23.5687C35.0511 23.6188 34.9489 23.6188 34.8669 23.5687L22 15.7057V14.6667C22 13.1939 23.1641 12 24.6 12H45.4C46.8359 12 48 13.1939 48 14.6667V15.7057ZM48 18.189V29.3333C48 30.8061 46.836 32 45.4 32H24.6C23.1641 32 22 30.8061 22 29.3333V18.189L33.8023 25.4014C34.5402 25.8524 35.4598 25.8524 36.1977 25.4014L48 18.189Z" />
                                    </svg>
                                    <div class="text">
                                        {t("friendRequests")}
                                        <Show when={includes().requests!.outgoing > 0}>
                                            <span class="outgoing">
                                                ({t("outgoing")}: {includes().requests!.outgoing})
                                            </span>
                                        </Show> 
                                    </div>
                                    
                                </div>

                                <div class="subTitle">
                                    <Show when={includes().requests!.incoming > 0}>
                                        <div class="badge">
                                            {includes().requests!.incoming}
                                        </div>
                                    </Show>
                                    <svg class="arrow" viewBox="0 0 18 31" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8453 17.5096L4.492 29.8632C3.51569 30.8392 1.93268 30.8392 0.956482 29.8632C-0.0198364 28.8866 -0.0198364 27.3036 0.956482 26.3275L11.5626 15.7211L0.95636 5.11462C-0.0199585 4.13855 -0.0199585 2.55554 0.95636 1.57947C1.93268 0.602905 3.51544 0.602905 4.49176 1.57947L16.866 13.9535C17.2117 14.2992 17.4315 14.722 17.5323 15.1659C17.6815 15.8197 17.565 16.5219 17.1832 17.1C17.0921 17.2372 16.9871 17.368 16.866 17.4891C16.8592 17.496 16.8524 17.5028 16.8453 17.5096Z"/>
                                    </svg>
                                </div>
                            </button>
                        </Show>
                        <div class="friendList">
                            <For each={users.posts} fallback={(users.posts[0] || end()) && <></>}>
                                {(item) => (
                                    <Cell type={"friend"} item={item} onOpenUser={showUserModal} />
                                )}
                            </For>
                        </div>
                        <Show when={loading()}>
                            <Placeholder />
                        </Show>
                    </Match>
                    <Match when={searchQuery()}>
                        <div class="friendList">
                            <Search query={searchQuery()!} onOpenUser={showUserModal} />
                        </div>
                    </Match>
                </Switch> */}
            </div>
        </main>
        
    </>
}