import {HSLtoString, generateHSL } from "@/ui/utils/HSLgen";
//import Picture from "../Picture";


import "./styles.css";

interface AvatarPlaceholderProps {
    name: string;
}

function AvatarPlaceholder({name}: AvatarPlaceholderProps) {
   const styles = `--color: ${HSLtoString(generateHSL(name)).toString()};`

    return (
        <div class="avatar">
            <div class="background" style={styles}>
                {Array.from(name)[0]}
            </div>
        </div>
    );
}

export default AvatarPlaceholder;