import { ref } from "hywer/jsx-runtime"
import SearchIcon from "@/ui/icons/search";
import PlusIcon from "@/ui/icons/plus";
import { store } from "@/data";
import './styles.css'

interface SearchInputProps {
    onInput: (text: string) => void;
    id: string;
    autofocus?: boolean
}

export default function SearchInput({onInput, id, autofocus}: SearchInputProps) {
    const {strings} = store.locale()

    const searchQuery = ref("")

    function onInputQuery(e: InputEvent) {
        const input = e.target as HTMLInputElement
        if(/^\s/.test(input.value)) input.value = '';

        searchQuery.val = input.value

        onInput(input.value)
    }

    
    
    function clearInput() {
        const input = document.querySelector<HTMLInputElement>(`#${id}`)

        input!.value = ''
        searchQuery.val = ''
        input?.focus()

        onInput('')
    }

    return (
        <div class="textField">
            <SearchIcon />
            <input autofocus={autofocus} onInput={onInputQuery} id={id} enterkeyhint="search" placeholder={strings["search"]} type="text" /> 
            <button class={searchQuery.derive((val) => val == "" ? "clear hidden" : "clear")} onClick={clearInput}>
                <PlusIcon />
            </button>
        </div>
    )

}