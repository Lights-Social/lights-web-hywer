import {Api} from "../../api"
import { ref } from 'hywer'
import Post from "../../components/Post"


function User() {
    let username = 'developulous'
    async function fetchItems(offset) {
		const response = await Api(`users/getByUsername/${username}/wall?offset=${offset}&limit=${15}`);
		
		let json = await response?.json();
		return json;
	}


    const posts = ref([])
    const profiles = ref([])

    fetchItems(0).then((res) => {
        posts.val = res.data
        profiles.val = res.includes.users
    })
v

    return <>
        <main>
            <div class="postsList">
                {posts.derive(val => val.map(post => <Post post={post} profile ={profiles.val.find(profile => profile.id === post.peer.id)}/>))}
            </div>
        </main>
    	
    </>
}

export default Home