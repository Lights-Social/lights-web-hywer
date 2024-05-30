import {HSLtoString, generateHSL } from "@/ui/utils/HSLgen";
//import Picture from "../Picture";


import "./styles.css";
import type { Reactive } from "hywer/jsx-runtime";

interface AvatarPlaceholderProps {
    name: Reactive<string>;
}

function AvatarPlaceholder({name}: AvatarPlaceholderProps) {

    return (
        <div class="avatar">
            {
                name.derive((val) => {
                    return <div class="background" style={`--color: ${HSLtoString(generateHSL(val)).toString()};`}>
                        {Array.from(val)[0]}
                    </div>
                })
            }
        </div>
    );
}

export default AvatarPlaceholder;