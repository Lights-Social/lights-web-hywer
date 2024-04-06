import MomentsList from '@/ui/MomentsList';
import './styles.css'
import ActiveContactsList from '@/ui/Sidebar/ActiveContactsList/ActiveContactsList';
import { store } from '@/data';
import MomentIcon from '@/ui/icons/moment';
import ActiveIcon from '@/ui/icons/active';



function SideBar() {
    const locale = store.locale()
    
    return(
        <div class="sideBar">
            <div class="block">
                <div class="title">
                    <MomentIcon />

                    {locale["moments"]}
                </div>

                <MomentsList />
            </div>
            <div class="block">
                <div class="title">
                    <ActiveIcon />
                    {locale["activeContacts"]}
                </div>
                <ActiveContactsList />
            </div>
        </div>
    )
}

export default SideBar;