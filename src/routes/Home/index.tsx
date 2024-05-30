import SideBar from "@/ui/Sidebar/Sidebar";
import {PostsList} from "@/ui/PostsList/PostsList";
import { MobileHeader } from "@/ui/MobileHeader/MobileHeader";
import { store } from "@/data";

function Home() {
    const {strings} = store.locale()

    console.log("dd")

    return <>
        <MobileHeader>
            <div class="title">{strings["home"]}</div>
        </MobileHeader>
        <main class="homeView">
            <PostsList uri={`feeds/following`} />
            <SideBar />
        </main>
    	
    </>
}

export default Home