import {HSLtoString, generateHSL } from "@/ui/utils/HSLgen";
//import Picture from "../Picture";


import "./styles.css";

interface AvatarPlaceholderProps {
    name: string;
    width: number;
    height: number;
}

function AvatarPlaceholder({name, width, height}: AvatarPlaceholderProps) {

    return (
        <div class="avatar">
            <div class="background" style={{"width": width, "height": height, "--color": HSLtoString(generateHSL(name)).toString()}}>
                {Array.from(name)[0]}
            </div>
        </div>
    );
}

export default AvatarPlaceholder;