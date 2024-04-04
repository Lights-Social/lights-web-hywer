// import {Api} from "../../api"
// import { ref, effect } from 'hywer'
import './styles.css'

function Picture({picture}) {


    return (
        <div class="photo" style={{"aspect-ratio": 1}}>

            <img src={`${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${picture}.webp`} />
        </div>
    )

}

export default Picture