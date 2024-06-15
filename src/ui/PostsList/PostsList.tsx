import { store } from "@/data";
import Post from "@/ui/Post/Post";
import PostPlaceholder from "@/ui/Post/Placeholder";
import { ArrayRender } from "hywer/x/array";
import { effect, ref } from "hywer/jsx-runtime";
import { Modal, closeModal, openModal } from "@/ui/Modal/Modal";

interface PostsListProps {
    uri: string;
}

const postToDelete = ref<{id: string}>({id: ""})


export function PostsList({uri}: PostsListProps) {
    const {container: posts, next} = store.getPosts(uri)
    const shown = ref(false)
    const {strings} = store.locale()

    shown.val = posts.posts.val.length > 0

    effect(() => {
        shown.val = posts.posts.val.length > 0


    }, [posts.posts])

    function deleteHandler(id: string) {
        postToDelete.val = {id}
        openModal("deletePostModal", [7,7,7,7], false)
    }

    function deletePost() {
        store.deletePost(postToDelete.val.id)
        closeModal("deletePostModal")

        postToDelete.val.id = ""
    }



    return <>
        {shown.derive(val => 
            !val ?
            <div class="postsList">
                {
                    posts.state.derive(val => {
                        if (val == 'errored') {
                            return (
                                <div>bro datz crazy</div>
                            )
                        } else {
                            return (
                                <PostPlaceholder />
                            )
                        }
                    })
                }
            </div> :
            <ArrayRender in={posts.posts} elem={<div class="postsList"/>}>
                {
                    (post, i) => (
                        <Post
                            item={post}
                            onVisible={i == Number(posts.posts.val.length - 5) ? next : undefined}
                            onDelete={deleteHandler}
                        />
                    )
                }
            </ArrayRender>
            
        )}
        <Modal type="modal" id="deletePostModal">
            <h1>{strings["deletePost"]} 🗑️</h1>
            <p>
                {strings["deletePostConfirmation"]}
            </p>
            <div class="buttons">
                <button class="reset" onClick={deletePost}>{strings["delete"]}</button>
                <button onClick={() => closeModal("deletePostModal")}>{strings["cancel"]}</button>
            </div>
        </Modal>
    </>

}