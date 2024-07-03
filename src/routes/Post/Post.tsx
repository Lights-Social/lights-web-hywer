import { store } from "@/data";
import "./styles.css"
import Post from "@/ui/Post/Post";
import { CommentList } from "./CommentList/CommentList";
import PostPlaceholder from "@/ui/Post/Placeholder";
import { navigateTo } from "hywer/x/router";
import { derive, effect } from "hywer/jsx-runtime";
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

    console.log(post.get().peer.id.val)


    const {user, state: userState} = store.getProfileById(post.get().peer.id.val)

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
                    derive(([state, userState]) => {


                        if (state.val == "success" && userState.val == "success") {
                            return <Post
                                user={user}
                                item={post!}
                                onDelete={deleteHandler}
                                full={true}
                            />
                        } else {
                            return <PostPlaceholder />
                        }
                    }, [state, userState])
                }
                <hr />

                <CommentList post_id={post_id} creator_id={post.get().peer.id.val} />
                <CommentEditor />
            </div>
        </main>
    </>
}

export default PostView