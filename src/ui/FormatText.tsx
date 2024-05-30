import { openModal } from "@/ui/Modal/Modal";
import { link } from "./OpenLinkModal";

type BoxProps = {
    children: string;
};

export default function FormatText(props: BoxProps) {
    const escapeHtml = () => {
        var tempElement = document.createElement("div");
        tempElement.innerHTML = props.children;
        return tempElement.innerText;
    }


    async function showLinkConfirm(newLink: string) {
        link.val = newLink
        openModal("openLinkModal", [7,7,7,7], false)
    }

    const renderTextWithLinks = () => {
        // Use a regex to identify hyperlinks in the text
        const linkRegex = /(https?:\/\/[^\s]+)/g;
        
        const parts = escapeHtml().split(linkRegex);

        const result = parts.map((part) => {
            if (part.match(linkRegex)) {
                // If the part is a hyperlink, render it as a Link component
                return <a onClick={(e: Event) => {e.preventDefault(); showLinkConfirm(part)}} href={part} target="_blank" rel="noopener noreferrer">
                    {part}
                </a>
            } else {
                // Otherwise, render the plain text
                return <>{part}</>;
            }
        });

        return result
    };

    return(
        <>
            {renderTextWithLinks()}
        </>
    );
}