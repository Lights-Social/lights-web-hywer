import './styles.css'

interface PlaceholderProps {
    count?: number;
}

function Placeholder(props: PlaceholderProps) {
    return (
        <>
            {
                [...Array(props.count ? props.count : 3)].map(() => {


                    return (
                        <article class="comment placeholder">
                            <div class="avatar placeholderAnimated" />
                            <div class="top">
                                <div class='center'>
                                    <div class="title placeholderAnimated" />
                                    <div class="content">
                                        <div style="width: 90%" class="placeholderAnimated" />
                                        <div style="width: 70%" class="placeholderAnimated" />        
                                    </div>
                                </div>
                            </div>
                            
                            
                        </article>
                    )
                })
            }
        </>
    )

}

export default Placeholder;