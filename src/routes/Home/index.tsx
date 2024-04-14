import Post from "@/ui/Post/Post"
import SideBar from "@/ui/Sidebar/Sidebar";
import PostPlaceholder from "@/ui/Post/Placeholder";
import { store } from "@/data";

function Home() {


    const posts = store.getPosts(`feeds/following`, 0)


    return <>
        <main>
            <div class="postsList feed">
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
            </div>
            <SideBar />
        </main>
    	
    </>
}

export default Home