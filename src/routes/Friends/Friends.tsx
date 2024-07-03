import './styles.css';
import { store } from "@/data";
import { MobileHeader } from '@/ui/MobileHeader/MobileHeader';
import { ref } from 'hywer/jsx-runtime';
import MapErrorModal from '@/ui/MapErrorModal';
import MessengerErrorModal from '@/ui/MessengerErrorModal';
import { FriendList } from './FriendList';
import {Search} from './Search';
import SearchInput from '@/ui/SearchInput/SearchInput';

export default function Friends() {
    const {strings} = store.locale()    

    const searchQuery = ref("")

    return <>
        <MobileHeader>
            <span class="title">{strings["friends"]}</span>
        </MobileHeader>
        <MapErrorModal />
        <MessengerErrorModal />
        <main class="friendsView">
            <div class="window">
                <SearchInput id="friendsSearchInput" onInput={(text) => searchQuery.val = text} />

                {
                    searchQuery.derive(val => {
                        if (val == "") {
                            return <div>
                                <FriendList />
                            </div>
                        } else {
                            return <div>
                                <Search query={val} />
                            </div>
                        }
                    })
                }
                
            </div>
        </main>
        
    </>
}