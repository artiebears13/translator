export interface ITranslationResult {
    originalText: string;
    translatedText: string;
    fromLang: string;
    toLang: string;
    match: boolean;
    usedCache: boolean;
    timestamp: string;
}


export interface ITranslateOptions {
    text: string;
    fromLanguage: string;
    toLanguage: string;
}

export interface ITranslationApiResponse {
    responseData: {
        translatedText: string;
        match?: number;
    };
    responseStatus: number;
    matches?: Array<{
        translation: string;
        quality: number;
        match: number;
    }>;
}

export interface ICacheResponse {
    originalText: string;
    translatedText: string;
    match: boolean;
    fromLang: string;
    toLang: string;
}
