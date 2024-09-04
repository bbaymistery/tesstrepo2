import { translationMap } from "./insideHelper";

/**
 * Renders a translation component based on the provided language.
 *
 * @param {Object} props - The component props.
 * @param {string} props.language - The language to use for the translation.
 * @returns {React.ReactElement|null} The translation component or null if no translation is available.
 */
export const Translation = ({ language }) => {

    const selectedTranslation = translationMap[language];
    return selectedTranslation ? (
        <p className={styles.declaration}>
            {selectedTranslation.translation1}
            <br />
            {selectedTranslation.translation2}
        </p>
    ) : null;
};
