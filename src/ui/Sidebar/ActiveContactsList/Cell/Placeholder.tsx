import sync from 'css-animation-sync';

sync('loadingPlaceholder');

// interface PlaceholderProps {
//     count?: number;
// }

export default function Placeholder() {
    //const countElements = props.count ? props.count : Math.floor(280/80);

    return (
        <>
            <div style={{height: "150px"}} />
            {/* {
                [...Array(countElements)].map((index) => {
                    return (
                        <div class="cell placeholder">
                            <div class="avatar placeholderAnimated" />
                            <div class="name placeholderAnimated" />
                            <div class="activity placeholderAnimated" />
                        </div>
                    )
                })
            } */}
        </>
    )

}