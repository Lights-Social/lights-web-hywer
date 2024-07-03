import { store } from "@/data";
import CommentPlaceholder from "../Comment/Placeholder";
import { ArrayRender } from "hywer/x/array";
import { effect, ref } from "hywer/jsx-runtime";
import { Modal, closeModal, openModal } from "@/ui/Modal/Modal";
import Comment from "../Comment/Comment";
import EmptyListComponent from "../Comment/EmptyListComponent";

interface CommentListProps {
    post_id: string;
    creator_id: string
}

const commentToDelete = ref<{id: string}>({id: ""})


export function CommentList({post_id, creator_id}: CommentListProps) {
    const {container: comments, next} = store.getComments(post_id)
    const shown = ref(false)
    const {strings} = store.locale()

    shown.val = comments.comments.val.length > 0

    effect(() => {
        shown.val = comments.comments.val.length > 0

    }, [comments.comments])

    function deleteHandler(id: string) {
        commentToDelete.val = {id}
        openModal("deleteCommentModal", [7,7,7,7], false)
    }

    function deleteComment() {
        //store.deletePost(commentToDelete.val.id)
        closeModal("deleteCommentModal")

        commentToDelete.val.id = ""
    }


    console.log(creator_id)

    return <>
        {shown.derive(val => 
            !val ?
            <div class="commentsList">
                {
                    comments.state.derive(val => {
                        if (val == 'errored') {
                            return (
                                <div>bro datz crazy</div>
                            )
                        } else {
                            if (!(comments.state.val == 'success' && comments.comments.val.length == 0)) {
                                return <CommentPlaceholder />
                            } else {
                                return (
                                    <EmptyListComponent />
                                )
                            }
                        }
                    })
                }
            </div> :
            <ArrayRender in={comments.comments} elem={<div class="commentsList"/>}>
                {
                    (comment, i) => (
                        <Comment
                            item={comment}
                            creator_id={creator_id}
                            onVisible={() => {}}
                            onDelete={deleteHandler}
                        />
                    )
                }
            </ArrayRender>
            
        )}
        <Modal type="modal" id="deleteCommentModal">
            <h1>{strings["deleteComment"]} 🗑️</h1>
            <p>
                {strings["deleteCommentConfirmation"]}
            </p>
            <div class="buttons">
                <button class="reset" onClick={deleteComment}>{strings["delete"]}</button>
                <button onClick={() => closeModal("deleteCommentModal")}>{strings["cancel"]}</button>
            </div>
        </Modal>
    </>

}