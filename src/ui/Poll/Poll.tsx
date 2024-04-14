import './styles.css'
import PollIcon from '@/ui/icons/poll'

const testPollData = {
    title: "сука ты чё еблан?",
    votes: 437,
    isVoted: [],
    options: [
        {
            id: "1",
            title: "да",
            count: 312,
        },
        {
            id: "2",
            title: "нет",
            count: 125,
        }
    ]
}

function calculatePercentage(number: number, anotherNumber: number) {
    return Math.round((number * 100) / anotherNumber);
}

export default function Poll() {
    // private profiles = ref<Map<string, IProfile>>(new Map())



    // testPollData.isVoted.forEach((profile) => {
    //     this.profiles.val.set(profile.id, profile)
    // })

    return (
        <div class="poll">
            <div class="title">
                <PollIcon />
                {testPollData.title}
                <span class="description">Anonymous poll</span>
            </div>
            <div class="options">
                {
                    testPollData.options.map(option => {
                        return <div class="option">
                            <span class="title">{option.title}</span>

                            <div class="counter">
                                {calculatePercentage(option.count, testPollData.votes) + "%"}
                            </div>
                            <div class="wrapper" style={"--option-percent: " + calculatePercentage(option.count, testPollData.votes) + "%"} />
                        </div>
                    })
                }
            </div>
            <div class="other">
                <button class="resultsButton">
                    Show results
                </button>
            </div>
        </div>
    )
}