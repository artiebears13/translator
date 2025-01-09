// src/components/TextInput/TextInput.tsx
import React from 'react';
import styles from './TextInput.module.scss';

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder, disabled = false }) => {
    return (
        <textarea
            className={styles.textInput}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={6}
        />
    );
};

export default TextInput;
