import capitalizeFirstLetter from "./capitalizeFirstLetter";

export default function getNativeLanguageName(lang: string) {
    const languageCanonicalNames = new Intl.DisplayNames(lang, {
        type: "language",
        style: "short",
        languageDisplay: "standard"
    });

    return capitalizeFirstLetter(languageCanonicalNames.of(lang)!)
}