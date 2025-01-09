import React from "react";
import languages from "../../utils/languages.json";
import styles from "./LanguageSelector.module.scss";

interface LanguageSelectProps {
    selectedLanguage: string;
    onChange: (language: string) => void;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({
                                                           selectedLanguage,
                                                           onChange,
                                                       }) => {

    const renderSelectOptions = (): JSX.Element[] => {
        const options: JSX.Element[] = [];

        Object.entries(languages).forEach(([key, value]) => {
            if (key !== "Autodetect") {
                options.push(
                    <option key={key} value={key}>
                        {value}
                    </option>
                );
            }
        });

        return options;
    };
    return (
        <select
            value={selectedLanguage}
            onChange={(e) => onChange(e.target.value)}
            className={styles.select}
        >
            {renderSelectOptions()}
        </select>
    )
}

export default LanguageSelect;