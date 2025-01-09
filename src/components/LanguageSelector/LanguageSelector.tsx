import React from 'react';
import styles from './LanguageSelector.module.scss';
import RecentLanguages from "./RecentLanguages.tsx";
import LanguageSelect from "./LanguagesSelect.tsx";

interface LanguageSelectorProps {
    selectedLanguage: string;
    onChange: (language: string) => void;
    isSource: boolean;
    recentLanguages?: string[];
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
                                                               selectedLanguage,
                                                               onChange,
                                                               isSource,
                                                               recentLanguages = [],
                                                           }) => {

    return (
        <div className={styles.languageSelector}>
            {isSource && (
                <div
                    className={`${styles.recentLanguage} ${selectedLanguage === 'Autodetect' ? styles.selected : ''}`}
                    onClick={() => onChange('Autodetect')}
                >
                    Авто
                </div>
            )}

            <RecentLanguages
                selectedLanguage={selectedLanguage}
                recentLanguages={recentLanguages}
                onChange={onChange}
            />
            <LanguageSelect selectedLanguage={selectedLanguage} onChange={onChange} />
        </div>
    );
};

export default LanguageSelector;
