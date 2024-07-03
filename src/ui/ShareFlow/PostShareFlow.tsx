import { store } from '@/data';
import { Modal, closeModal, openModal } from '@/ui/Modal/Modal';
import type { RecReactiveProxy } from 'hywer/x/store';
import type { IPost } from '@/data/types/models';

import BackIcon from "@/ui/icons/back"
import { ref } from 'hywer/jsx-runtime';
import { UserList } from './UserList/UserList';
import ShareButtons from './ShareButtons';
import './styles.css'
import SendBar from './SendBar/SendBar';
import SearchInput from '@/ui/SearchInput/SearchInput';

const item = ref<RecReactiveProxy<IPost> | undefined>(undefined)


export default function PostShareFlow() {
    const {strings} = store.locale()


    const searchQuery = ref("")

    let selectedUsers: string[] = []
    const selectedCount = ref(0)

    // effect(() => {
    //     console.log(selectedUsers.val)
    // }, [selectedUsers])

    function select(id: string) {
        selectedUsers.push(id)

        selectedCount.val = selectedCount.val + 1
    }

    function remove(id: string) {
        selectedUsers = selectedUsers.filter((val) => val != id)

        selectedCount.val = selectedCount.val - 1

    }

    function onSend() {
        selectedUsers.forEach((val) => {
            console.log(val)
        })
        closeModal("postShareFlow")
    }

    return (
        <Modal type="flowFull" id="postShareFlow">
            <div class='bar'>
                <button class='close' onClick={() => closeModal("postShareFlow")}>
                    <BackIcon />
                    {strings["back"]}
                </button>

                <div class="title">
                    {strings["share"]}
                </div>
            </div>
            <SearchInput id="usersSearchInput" onInput={(text) => searchQuery.val = text} />
            <div class="userListWrapper">
                {
                    searchQuery.derive(val => {
                        if (val == "") {
                            return <div>
                                <UserList
                                    onSelect={select}
                                    onDelete={remove}
                                    selectedUsers={selectedUsers}
                                />
                            </div>
                        } else {
                            return <div>
                                {val}
                            </div>
                        }
                    })
                }
            </div>
            <div class={selectedCount.derive((val) => val == 0 ? 'secondBar' : 'secondBar hidden')}>
                <ShareButtons item={item}/>
            </div>

            <div class={selectedCount.derive((val) => val != 0 ? 'secondBar' : 'secondBar hidden')}>
                <SendBar onSend={onSend} />
            </div>

        </Modal>
    )
}

export function showPostShareFlow(post: RecReactiveProxy<IPost>) {

    item.val = post
    
    openModal("postShareFlow", [1], false)
}