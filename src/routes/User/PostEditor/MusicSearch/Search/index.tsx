//import Cell from "../Cell";
//import { Placeholder } from "../Cell/Placeholder";
import type { IAudio, IProfile } from "@/data/types/models";
import type { Reactive } from "hywer/jsx-runtime";
import { For } from 'hywer/x/html';
import Cell from "../Cell";
import { store } from "@/data";
import { Placeholder } from "../Cell/Placeholder";


interface SearchProps {
    query: string;
    onAddTrack: (track: IAudio) => void;
    onRemoveTrack: (isrc: string) => void;
    selectedTracks: Reactive<IAudio[]>;
}

function NotFoundPlaceholder() {

    return (
        <div class="emptyPlaceholder">
            <div class="title">
                Not found
            </div>
        </div>
    )
}

export default function Search(props: SearchProps) {

    const {tracks, next} = store.getTracks(props.query)


    return (
        <div class="searchTrackList">
            {
                <For in={tracks}>
                    {(item) => (
                        <Cell isSelected={!!props.selectedTracks.val.find((track) => track.isrc == item.isrc)} onAddTrack={props.onAddTrack} onRemoveTrack={() => props.onRemoveTrack(item.isrc)} item={item} />
                    )}
                </For>
            }
            {
                tracks.derive((val) => val.length == 0) && <Placeholder />
            }
            {/* <For each={tracks.posts} fallback={(tracks.posts[0] || end()) && <NotFoundPlaceholder />}>
                {(item) => (
                    <Cell isSelected={!!props.selectedTracks.find((track) => track.isrc == item.isrc)} onAddTrack={props.onAddTrack} onRemoveTrack={props.onRemoveTrack} item={item} />
                )}
            </For> */}
            {/* <Show when={loading()}>
                <Placeholder />
            </Show> */}
        </div>
        
    )
}