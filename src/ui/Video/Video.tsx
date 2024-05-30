import './styles.css'

interface VideoProps {
    src: string;
    muted: boolean;
    onClick?: () => void;
}

export default function Video({src, muted, onClick}: VideoProps) {
    // const aspectRatio = () => (props.video.width && props.video.height) ? props.video.width / props.video.height : 1;

    

    return (
        <div onClick={onClick ? () => onClick() : undefined} class="video">
            <video autoplay muted={muted} loop>
                <source src={src} type="video/mp4" />
            </video>
        </div>
        
    )
}