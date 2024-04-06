import Post from "@/ui/Post/Post"
import PostPlaceholder from "@/ui/Post/Placeholder";
import { store } from "@/data";

interface UserProps {
    username: string
}
function User({username}: UserProps) {
    const posts = store.getPosts(`users/getByUsername/${username}/wall`, 0)

    store.getProfileByUsername(username)

    return <>
        <main>
            <div class="postsList">
                {
                    posts.derive(val => val.length == 0 ? <PostPlaceholder /> : <div style="display: none"></div>)
                }
                {posts.derive(val => {
                    return val.map(post => {
                        return <Post
                            post={post}
                            profile ={store.getProfileById(post.peer.id)!}
                        />
                    })
                })}

                {/* {profile.derive(val => {
                    return val == null ? null : <Profile profile={val!} />
                })} */}

            </div>

        </main>
    	
    </>
}

export default User