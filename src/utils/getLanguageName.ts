import languages from './languages.json';

const languagesTyped: Record<string, string> = languages;

export const getLanguageName = (code: string): string => {
    return languagesTyped[code] || code;
};