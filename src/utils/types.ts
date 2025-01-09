import {ITranslationResult, ITranslateOptions} from "./interface.ts";

export type TranslationFunction = (options: ITranslateOptions) => Promise<ITranslationResult>;