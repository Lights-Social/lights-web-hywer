//import sync from 'css-animation-sync';
import './styles.css'
//sync('loadingPlaceholder');

interface PlaceholderProps {
    count?: number;
}

export default function Placeholder(props: PlaceholderProps) {


    // createEffect(() => {
    //     const handleResize = () => {
    //         setHeight(window.innerHeight);
    //     };
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, );

    return (
        <>
            <article class="post placeholder">
                <div class="title placeholderAnimated" />
                <div class="avatar placeholderAnimated" />
                <div class="content">
                    <div style={{"width":"90%"}} class="placeholderAnimated" />
                    <div style={{"width":"70%"}} class="placeholderAnimated" />        

                    <div style={{"height":"200px"}} class="placeholderAnimated" />
                </div>
                <div class="line" />
                <div class="buttons">
                    <div class="replies placeholderAnimated" />
                </div>
            </article>
            
            <article class="post placeholder">
                <div class="title placeholderAnimated" />
                <div class="avatar placeholderAnimated" />
                <div class="content">
                    <div style={{"width":"90%"}} class="placeholderAnimated" />
                    <div style={{"width":"70%"}} class="placeholderAnimated" />        

                    <div style={{"height":"200px"}} class="placeholderAnimated" />
                </div>
                <div class="line" />
                <div class="buttons">
                    <div class="replies placeholderAnimated" />
                </div>
            </article>

            <article class="post placeholder">
                <div class="title placeholderAnimated" />
                <div class="avatar placeholderAnimated" />
                <div class="content">
                    <div style={{"width":"90%"}} class="placeholderAnimated" />
                    <div style={{"width":"70%"}} class="placeholderAnimated" />        

                    <div style={{"height":"200px"}} class="placeholderAnimated" />
                </div>
                <div class="line" />
                <div class="buttons">
                    <div class="replies placeholderAnimated" />
                </div>
            </article>
        </>
    )

}