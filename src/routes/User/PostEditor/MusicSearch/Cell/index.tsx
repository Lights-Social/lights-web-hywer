import type { IAudio } from "@/data/types/models";

import './styles.css'
import { ref } from "hywer/jsx-runtime";
import Checkmark2Icon from "@/ui/icons/checkmark2";
import PlusIcon from "@/ui/icons/plus";
import Picture from "@/ui/Picture";

interface CellProps {
    item: IAudio;
    onAddTrack?: (track: IAudio) => void;
    onRemoveTrack: (isrc: string) => void;
    isSelected: boolean;
}

export default function Cell({item, onAddTrack, onRemoveTrack, isSelected}: CellProps) {

    const isSelectedButton = ref(isSelected)

    function toggleTrack() {
        if (isSelectedButton.val) {
            isSelectedButton.val = false
            onRemoveTrack(item.isrc)
        } else {
            isSelectedButton.val = true
            onAddTrack && onAddTrack(item)
        }
    }

    return (
        <div class={isSelectedButton.derive((val) => val ? "track selected" : "track")}>
            <div class="photoWrapper">
                <Picture src={item.artwork} />
            </div>
            
            <div class="info">
                <span class="title">{item.title}</span>
                <span class="artist">{item.artist}</span>
            </div>
            <button onClick={toggleTrack} class="playButton">
                {
                    isSelectedButton.derive((val) => val ? <Checkmark2Icon /> : <PlusIcon />)
                }
            </button>
        </div>
    )
}