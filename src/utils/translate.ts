
import { ITranslateOptions, ITranslationApiResponse, ITranslationResult } from './interface.ts';

const translationCache: Map<string, string> = new Map<string, string>();

function createTranslationUrl(options: ITranslateOptions): string {
    const fromLang = options.fromLanguage;
    const toLang = options.toLanguage;
    const encodedText = encodeURIComponent(options.text);

    return `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${fromLang}|${toLang}`;
}

export async function fetchTranslation(options: ITranslateOptions): Promise<ITranslationResult> {
    const fromLang: string = options.fromLanguage;
    const toLang: string = options.toLanguage;
    const text: string = options.text.trim();

    const cacheKey: string = `${fromLang}:${toLang}:${text}`;

    if (translationCache.has(cacheKey)) {
        return {
            originalText: text,
            translatedText: translationCache.get(cacheKey)!,
            fromLang,
            toLang,
            usedCache: true,
            match: true,
            timestamp: new Date().toISOString(),
        };
    }

    const url: string = createTranslationUrl(options);

    const response: Response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }

    const data: ITranslationApiResponse = await response.json();
    if (!data.responseData?.translatedText) {
        throw new Error('API did not return translatedText');
    }

    const resultText: string = data.responseData.translatedText;
    translationCache.set(cacheKey, resultText);

    return {
        originalText: text,
        translatedText: resultText,
        fromLang,
        toLang,
        usedCache: false,
        match: true,
        timestamp: new Date().toISOString(),
    };
}