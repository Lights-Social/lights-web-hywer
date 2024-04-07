
import { store } from '@/data';
import './styles.css';

import ThemeSelector from './ThemeSelector';


export default function AppearanceSettings() {
    const {strings} = store.locale()


    // const [blurEnabled, setBlurEnabled] = createSignal(localStorage.getItem("blurEnabled") == "true");

    // function toggleBlur() {
    //     setBlurEnabled(prev => !prev);
    //     localStorage.setItem("blurEnabled", String(blurEnabled()));
    // }
    

    return (
        <>
            <main class='settingsView'>
                <div class='window'>
                    <span class="blockTitle">{strings["theme"]}</span>
                    <ThemeSelector />
                    {/* <span class="blockTitle">{locale["wallpaper"]}</span>

                    <div class="categoriesList">
                        <button class="category" onClick={() => { selectFiles(files => {files.forEach(file => setWallpaper(file))} )}}>
                            {locale["changeWallpaper"]}
                        </button>
                    </div> */}

                    {/* <div class="optionWrapper">
                        <span>
                            {locale["translucency"]}
                        </span>
                        <label class="switch">
                            <input id="blurSwitcher" onClick={() => {navigator.vibrate && navigator.vibrate(4); toggleBlur()}} type="checkbox" checked={blurEnabled()} />
                            <span class="slider" />
                        </label>
                    </div> */}
                </div>
            </main>
        </> 
    )
}