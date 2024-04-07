import {HSLtoString, generateHSL } from "@/ui/utils/HSLgen";
//import Picture from "../Picture";


import "./styles.css";

interface AvatarPlaceholderProps {
    name: string;
    width: number;
    height: number;
}

function AvatarPlaceholder({name, width, height}: AvatarPlaceholderProps) {
   const styles = `--color: ${HSLtoString(generateHSL(name)).toString()}; width: ${width}px; height: ${height}px`

    return (
        <div class="avatar">
            <div class="background" style={styles}>
                {Array.from(name)[0]}
            </div>
        </div>
    );
}

export default AvatarPlaceholder;