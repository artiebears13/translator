import React, {useState, useMemo, useEffect} from 'react';
import styles from './TranslateForm.module.scss';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import TextInput from '../TextInput/TextInput';
import TranslatedText from '../TranslatedText/TranslatedText';
import { fetchTranslation } from '../../utils/translate';
import { useDispatch, useSelector } from 'react-redux';
import { addTranslation } from '../../store/translationSlice';
import { ITranslationResult } from '../../utils/interface';
import { RootState } from '../../store';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const TranslateForm: React.FC = () => {
    const [text, setText] = useState('');
    const [fromLang, setFromLang] = useState('en');
    const [toLang, setToLang] = useState('ru');
    const [translatedText, setTranslatedText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [placeholder, setPlaceholder] = useState<string>("Введите текст для перевода");

    const dispatch = useDispatch();

    const history = useSelector((state: RootState) => state.translation.history);

    const getRecentLanguages = (langKey: 'fromLang' | 'toLang'): string[] => {
        const recent: string[] = [];
        for (let i = 0; i < history.length && recent.length < 2; i++) {
            const lang = history[i][langKey];
            if (lang !== 'Autodetect' && !recent.includes(lang)) {
                recent.push(lang);
            }
        }
        return recent;
    };

    useEffect(() => {
        const translatePlaceholder = async () => {
            try {
                setError(null);
                const result: ITranslationResult = await fetchTranslation({
                    text: "Введите текст для перевода",
                    fromLanguage: 'ru',
                    toLanguage: fromLang!=='Autodetect'? fromLang : 'en',
                });
                setPlaceholder(result.translatedText);
            } catch (err) {
                setError((err as Error).message);
            }
        };

        if (fromLang) {
            translatePlaceholder().then();
        }
    }, [fromLang]);

    const recentFromLanguages = useMemo(() => getRecentLanguages('fromLang'), [history]);
    const recentToLanguages = useMemo(() => getRecentLanguages('toLang'), [history]);

    const handleTranslate = async () => {
        if (!text.trim()) {
            return;
        }

        try {
            setError(null);
            const result: ITranslationResult = await fetchTranslation({
                text,
                fromLanguage: fromLang,
                toLanguage: toLang,
            });
            setTranslatedText(result.translatedText);
            dispatch(addTranslation(result));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const handleSwapLanguages = () => {
        setFromLang(toLang);
        setToLang(fromLang);
        setTranslatedText('');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            handleTranslate().then();
        }, 1000);

        return () => clearTimeout(timer);
    }, [text, fromLang, toLang]);

    return (
        <div className={styles.translateForm}>
            <div className={styles.translateFormInputs}>
                <div className={styles.translateFormInputButton}>
                <div className={styles.translateFormInputSection}>
                    <LanguageSelector
                        selectedLanguage={fromLang}
                        onChange={setFromLang}
                        isSource={true}
                        recentLanguages={recentFromLanguages}
                    />
                    <TextInput
                        value={text}
                        onChange={setText}
                        placeholder={placeholder}
                    />
                </div>
                <button onClick={handleSwapLanguages} className={styles.translateFormSwapButton} aria-label="Сменить языки">
                    <SwapHorizIcon />
                </button>
                </div>
                <div className={styles.translateFormOutputSection}>
                    <LanguageSelector
                        selectedLanguage={toLang}
                        onChange={setToLang}
                        isSource={false}
                        recentLanguages={recentToLanguages}
                    />
                    <TranslatedText
                        value={translatedText}
                        placeholder="Перевод появится здесь"
                        language={toLang}
                    />
                </div>
            </div>
            {error && <p className={styles.translateFormEerror}>{error}</p>}

        </div>
    );
};

export default TranslateForm;
