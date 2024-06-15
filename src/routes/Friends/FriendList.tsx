import { store } from "@/data";
import { ArrayRender } from "hywer/x/array";
import { effect, ref, type Reactive } from "hywer/jsx-runtime";
import { Modal, closeModal, openModal } from "@/ui/Modal/Modal";
import { Placeholder } from "./Cell/Placeholder";
import Cell from "./Cell";

export function FriendList() {
    const {container: friends, next} = store.getFriends()


    const shown = ref(false)
    shown.val = friends.users.val.length > 0

    effect(() => {
        shown.val = friends.users.val.length > 0

        console.log(friends.users.val)

    }, [friends.users])

    return <>
        {shown.derive(val => 
            !val ?
            <div class="friendList">
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
            <ArrayRender in={friends.users} elem={<div class="friendList"/>}>
                {
                    (friend, i) => (
                        <Cell
                            type={"friend"}
                            item={friend}
                            onVisible={i == Number(friends.users.val.length - 5) ? next : undefined}
                        />
                    )
                }
            </ArrayRender>
            
        )}
    </>

}