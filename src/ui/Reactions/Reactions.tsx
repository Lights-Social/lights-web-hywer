import DigitCounter from '@/ui/DigitCounter/DigitCounter';
import './styles.css'
import type { IPost, IReaction } from '@/data/types/models';

interface ReactionsProps {
    reactions: IPost['reactions'];
    onReact: (id: string) => void
}

interface ReactionProps {
    onReact: (id: string) => void,
    reaction: IReaction,
}

const reactions = [
    {
        "id": ":strawberry:",
        "emoji": "🍓"
    },
    {
        "id": ":thumbs-up:",
        "emoji": "👍"
    },
    {
        "id": ":red-heart:",
        "emoji": "❤️"
    },
    {
        "id": ":fire:",
        "emoji": "🔥"
    },
    {
        "id": ":heart-on-fire:",
        "emoji": "❤️‍🔥"
    },
    {
        "id": ":clown-face:",
        "emoji": "🤡"
    },
    {
        "id": ":pile-of-poo:",
        "emoji": "💩"
    },
    {
        "id": ":middle-finger:",
        "emoji": "🖕"
    }
]

function Reaction(props: ReactionProps) {

    function toggleReaction() {
        if (props.reaction.count == 1 && props.reaction.is_reacted == true) {            
            props.onReact(props.reaction.id)

            return
        }

        props.onReact(props.reaction.id)

    }


    return(
        <button onClick={toggleReaction} class={(props.reaction.is_reacted ? "isReacted" : "")} onDblClick={(e: Event) => e.stopPropagation()}>
            <div class="wrapper">
                <div class="emoji">
                    {reactions.find(r => r.id == props.reaction.id)?.emoji}
                </div>
                <DigitCounter count={props.reaction.count} />
            </div>
        </button>
    )
}

export default function Reactions(props: ReactionsProps) {

    return (<>
        <div class={"reactions"} onDblClick={(e: Event) => e.stopPropagation()} >
            {
                props.reactions.map(item => {
                    return <Reaction reaction={item} onReact={props.onReact} />
                })
            }
        </div>
    </>)
}