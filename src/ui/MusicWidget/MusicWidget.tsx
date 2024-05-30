import { Svg } from 'hywer/x/html';
import './styles.css'
import { type IAudio } from "@/data/types/models";
import CloseIcon from '../icons/close';


interface MusicWidgetProps {
    audios: IAudio[];
    type: "edit" | "post"
    onRemoveTrack?: (isrc: string) => void;
}

let platform: string = "spotify";


export default function MusicWidget({audios, type, onRemoveTrack}: MusicWidgetProps) {

    function showTrack(appleMusic: string, spotify: string, youtube: string) {

        if (platform == "appleMusic") {
            window.open(appleMusic, "_blank");
        } else if (platform == "spotify") {
            window.open("https://open.spotify.com/track/"+spotify, "_blank");
        } else if (platform == "youtube") {
            window.open("https://music.youtube.com/watch?v="+youtube, "_blank");
        }
    }



    return (
        <div class="musicWidget">
            {
                audios.map((item) => {
                    return <div class="track">
                        <div class="photoWrapper">
                            <div class="photo">
                                <img src={item.artwork} />
                            </div>
                        </div>
                        
                        <div class="info">
                            <span class="title">{item.title}</span>
                            <span class="artist">{item.artist}</span>
                        </div>
                        {
                            type == "edit" ?
                            <button onClick={() => onRemoveTrack && onRemoveTrack(item.isrc)} class="removeButton">
                                <CloseIcon />
                            </button> : null
                        }
                        <button onClick={() => showTrack(item.apple_music, item.spotify, item.youtube)} class="playButton">
                            
                            <Svg>
                                <svg viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M32 15.5359C34.6667 17.0755 34.6667 20.9245 32 22.4641L6.5 37.1865C3.83333 38.7261 0.5 36.8016 0.5 33.7224V4.27757C0.5 1.19837 3.83333 -0.726134 6.5 0.813467L32 15.5359Z" />
                                </svg>
                            </Svg>

                            {platform == "spotify" ? <div class="badge">
                                <Svg>
                                    <svg viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M59.3481 33.3087C47.4425 26.2383 27.8044 25.5882 16.439 29.0376C14.6138 29.5916 12.6837 28.5609 12.1308 26.7363C11.5776 24.9099 12.6069 22.9812 14.4334 22.4263C27.4801 18.4662 49.1683 19.231 62.8743 27.367C64.5159 28.3417 65.0544 30.4618 64.0814 32.1006C63.1076 33.7422 60.9857 34.2833 59.3481 33.3087ZM58.9582 43.781C58.1229 45.1363 56.3508 45.5615 54.9972 44.7292C45.0714 38.6279 29.9362 36.8605 18.1933 40.425C16.6705 40.8852 15.0621 40.0265 14.5995 38.5066C14.1407 36.9838 14.9997 35.3784 16.5198 34.9153C29.9343 30.8446 46.6107 32.8163 58.0109 39.822C59.3644 40.6557 59.7905 42.4287 58.9582 43.781ZM54.4388 53.8382C53.775 54.9267 52.358 55.2677 51.2734 54.6042C42.6001 49.3033 31.6833 48.1063 18.8268 51.0427C17.5879 51.3268 16.3532 50.5505 16.0706 49.3116C15.7869 48.0732 16.5603 46.8383 17.8019 46.5556C31.8711 43.3392 43.9398 44.7235 53.6749 50.6723C54.7603 51.3352 55.1022 52.7532 54.4388 53.8382ZM37.5002 0.565422C17.1019 0.565422 0.56543 17.1016 0.56543 37.4995C0.56543 57.8998 17.1019 74.4346 37.5002 74.4346C57.8988 74.4346 74.4346 57.8998 74.4346 37.4995C74.4346 17.1016 57.8988 0.565422 37.5002 0.565422Z" fill="#2FD566"/>
                                    </svg>
                                </Svg>
                            </div> : null}
                            {
                                platform == "youtube" ?
                                <div class="badge">
                                    <Svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 176" enable-background="new 0 0 176 176">
                                            <g id="XMLID_167_">
                                                <circle id="XMLID_791_" fill="#FF0000" cx="88" cy="88" r="88"/>
                                                <path id="XMLID_42_" fill="#FFFFFF" d="M88,46c23.1,0,42,18.8,42,42s-18.8,42-42,42s-42-18.8-42-42S64.9,46,88,46 M88,42   c-25.4,0-46,20.6-46,46s20.6,46,46,46s46-20.6,46-46S113.4,42,88,42L88,42z"/>
                                                <polygon id="XMLID_274_" fill="#FFFFFF" points="72,111 111,87 72,65  "/>
                                            </g>
                                        </svg>
                                    </Svg>
                                </div> : null
                            }
                            {
                                platform == "appleMusic" ?
                                <div class="badge appleMusic">
                                    <Svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <rect width="512" height="512" rx="15%" fill="url(#g)"/>
                                            <linearGradient id="g" x1=".5" y1=".99" x2=".5" y2=".02">
                                                <stop offset="0" stop-color="#FA233B"/>
                                                <stop offset="1" stop-color="#FB5C74"/>
                                            </linearGradient>
                                            <path fill="#ffffff" d="M199 359V199q0-9 10-11l138-28q11-2 12 10v122q0 15-45 20c-57 9-48 105 30 79 30-11 35-40 35-69V88s0-20-17-15l-170 35s-13 2-13 18v203q0 15-45 20c-57 9-48 105 30 79 30-11 35-40 35-69"/>
                                        </svg>
                                    </Svg>
                                </div> : null
                            }
                        </button>
                    </div>
                })
            }
        </div>
    )
}