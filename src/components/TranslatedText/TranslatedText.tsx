import React from 'react';
import styles from './TranslatedText.module.scss';

interface TranslatedTextProps {
    value: string;
    placeholder?: string;
    language: string;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ value, placeholder }) => {
    return (
        <textarea
            className={styles.translatedText}
            value={value}
            placeholder={placeholder}
            readOnly
            disabled
            rows={6}
        />
    );
};

export default TranslatedText;
