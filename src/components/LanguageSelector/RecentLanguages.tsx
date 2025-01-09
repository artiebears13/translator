import styles from "./LanguageSelector.module.scss";
import {getLanguageName} from "../../utils/getLanguageName.ts";
import React from "react";

interface RecentLanguagesProps {
    selectedLanguage: string;
    onChange: (language: string) => void;
    recentLanguages: string[];
}

const RecentLanguages: React.FC<RecentLanguagesProps> = ({recentLanguages, onChange, selectedLanguage}) => {
    return recentLanguages.map((lang) => (
        <div
            key={lang}
            className={`${styles.recentLanguage} ${selectedLanguage === lang ? styles.selected : ''}`}
            onClick={() => onChange(lang)}
        >
            {getLanguageName(lang)}
        </div>
    ));
};

export default RecentLanguages;