import { store } from "@/data";
import "./styles.css"
import Post from "@/ui/Post/Post";
import { CommentList } from "./CommentList/CommentList";
import PostPlaceholder from "@/ui/Post/Placeholder";
import { navigateTo } from "hywer/x/router";
import { effect } from "hywer/jsx-runtime";
import CommentEditor from "./CommentEditor/CommentEditor";
// import { derive, effect, ref } from "hywer/jsx-runtime";
// import {PostsList} from "@/ui/PostsList/PostsList";
// import { openModal } from "@/ui/Modal/Modal";
// import { navigateTo } from "hywer/x/router";

interface PostProps {
    post_id: string
}

function PostView({post_id}: PostProps) {

    const {post, state} = store.getPost(post_id)


    const user_id = store.auth.user_id()


    effect(() => {
        if (state.val == "error") {
            navigateTo(`/home`)

            setTimeout(() => {
                //showPostNotFoundModal()
            })
        }
    }, [state])


    function deleteHandler(id: string) {
        //postToDelete.val = {id}
        //openModal("deletePostModal", [7,7,7,7], false)
    }

    return <>
        <main class="postView">
            <div class="postContainer">
                {
                    state.derive((val) => {
                        if (val == "success") {
                            return <Post
                                item={post!}
                                onDelete={deleteHandler}
                                full={true}
                            />
                        } else {
                            return <PostPlaceholder />
                        }
                    })
                }
                <hr />

                <CommentList post_id={post_id} />
                <CommentEditor />
            </div>
        </main>
    </>
}

export default PostView