import { store } from "@/data";
import { ArrayRender } from "hywer/x/array";
import { effect, ref, type Reactive } from "hywer/jsx-runtime";
import { Placeholder } from "../Cell/Placeholder";
import Cell from "../Cell";
import './styles.css'

interface UserListProps {
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    selectedUsers: string[]
}

export function UserList({onSelect, onDelete, selectedUsers}: UserListProps) {
    const {container: friends, next} = store.getFriends()


    const shown = ref(false)
    shown.val = friends.users.val.length > 0

    effect(() => {
        shown.val = friends.users.val.length > 0

    }, [friends.users])

    return <>
        {shown.derive(val => 
            !val ?
            <div class="userList">
                {
                    friends.state.derive(val => {
                        if (val == 'errored') {
                            return (
                                <div>bro datz crazy</div>
                            )
                        } else {
                            return (
                                <Placeholder />
                            )
                        }
                    })
                }
            </div> :
            <ArrayRender in={friends.users} elem={<div class="userList"/>}>
                {
                    (friend, i) => (
                        <Cell
                            item={friend}
                            onVisible={i == Number(friends.users.val.length - 5) ? next : undefined}
                            onDelete={onDelete}
                            onSelect={onSelect}
                            isSelected={selectedUsers.includes(friend.get().id.val)}
                        />
                    )
                }
            </ArrayRender>
            
        )}
    </>

}