import { store } from "@/data";
import { ArrayRender } from "hywer/x/array";
import { effect, ref, type Reactive } from "hywer/jsx-runtime";
import { Modal, closeModal, openModal } from "@/ui/Modal/Modal";
import { Placeholder } from "./Cell/Placeholder";
import Cell from "./Cell";
import NotFoundPlaceholder from "./NotFoundPlaceholder/NotFoundPlaceholder";


interface SearchProps {
    query: string;
}


export function Search({query}: SearchProps) {
    const {container: users, next} = store.searchUsers(query)


    const shown = ref(false)
    shown.val = users.users.val.length > 0

    effect(() => {
        shown.val = users.users.val.length > 0

        console.log(users.users.val)

    }, [users.users])

    return <>
        {shown.derive(val => {
            if (!val) {
                return <div class="friendList">
                    {
                        users.state.derive(val => {
                            if (val == 'errored') {
                                return (
                                    <div>bro datz crazy</div>
                                )
                            } else {
                                if (users.state.val == 'success' && users.users.val.length == 0) {
                                    return <NotFoundPlaceholder />
                                } else {
                                    return (
                                        <Placeholder />
                                    )
                                }
                            }
                        })
                    }
                </div>
            } else {
                return <ArrayRender in={users.users} elem={<div class="friendList"/>}>
                    {
                        (user, i) => (
                            <Cell
                                type={"search"}
                                item={user}
                                onVisible={i == Number(users.users.val.length - 5) ? next : undefined}
                            />
                        )
                    }
                </ArrayRender>
            }
        })}
    </>

}