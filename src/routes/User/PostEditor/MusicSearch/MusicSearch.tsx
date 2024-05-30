import './MusicSearch.css'
//import Search from './Search';
import type { IAudio } from '@/data/types/models';
import { store } from '@/data';
import { effect, ref, type Reactive } from 'hywer/jsx-runtime';
import Cell from './Cell';
import Search from './Search';
import { ArrayRender } from 'hywer/x/array';

interface MusicSearchProps {
    onDone: (tracks: IAudio[]) => void;
    selectedTracks: Reactive<IAudio[]>;
}

export default function MusicSearch({selectedTracks, onDone}: MusicSearchProps) {
    const {strings} = store.locale()

    const searchQuery = ref("")
	const addedTracksCounter = ref(0)

    function onInputQuery(e: InputEvent) {
        const input = e.target as HTMLInputElement

		searchQuery.val = input.value.trim();

    }

    function addTrack(track: IAudio) {
		selectedTracks.val.push(track)
		addedTracksCounter.val = addedTracksCounter.val + 1
    }

    function removeTrack(isrc: string) {
		selectedTracks.val = selectedTracks.val.filter((item) => item.isrc !== isrc)
		addedTracksCounter.val = addedTracksCounter.val - 1

        if (addedTracksCounter.val == 0) {
            searchQuery.val = ""
        }
    }

    return (
        <>
            <input autofocus onInput={onInputQuery} name="search" enterkeyhint="search" placeholder={strings["search"]} type="text" />
            
			{
				searchQuery.derive((val) => {
					if (val == "" && selectedTracks.val.length == 0) {
						return (<div class="findMusicDescription">
							<span class="text">{strings["findMusicDescription"]}</span>
						</div>)
					} else if (val == "" && selectedTracks.val.length > 0) {
						return (
                            <ArrayRender in={selectedTracks} elem={<div class="searchTrackList" />}>
								{(item) => <Cell isSelected={true} onRemoveTrack={removeTrack} item={item} />}
							</ArrayRender>
                        )
						
					} else {
						return (
							<Search selectedTracks={selectedTracks} query={val} onAddTrack={addTrack} onRemoveTrack={removeTrack} />
						)
					}
				})
			}

            {/* <Switch>
                <Match when={!searchQuery() && selectedTracks().length == 0}>
                    <div class="findMusicDescription">
                        <span class="text">{strings["findMusicDescription"]}</span>
                    </div>

                </Match>
                <Match when={!searchQuery() && selectedTracks().length > 0}>
                    <div class="searchTrackList">
                        <For each={selectedTracks()}>
                            {(item) => (
                                <Cell isSelected={true} onRemoveTrack={removeTrack} item={item} />
                            )}
                        </For>
                    </div>
                </Match>
                <Match when={searchQuery()}>
                    <Search selectedTracks={selectedTracks()} query={searchQuery()!} onAddTrack={addTrack} onRemoveTrack={removeTrack} />
                </Match>
            </Switch> */}
            <div class={addedTracksCounter.derive((val) => val <= 0 ? 'secondBar hidden' : 'secondBar')}>
                <button class={'addTracks'} onClick={() => onDone(selectedTracks.val)}>
                    {strings["add"]}
                    <div class={addedTracksCounter.derive((val) => val > 0 ? "counter" : "counter hidden")}>
                        {addedTracksCounter.derive((val) => val)}
                    </div>
                </button>
            </div>
            
        </>
    )

}