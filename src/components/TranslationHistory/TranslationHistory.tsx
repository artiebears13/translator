import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { clearHistory } from '../../store/translationSlice';
import styles from './TranslationHistory.module.scss';
import { getLanguageName } from "../../utils/getLanguageName";

const TranslationHistory: React.FC = () => {
    const history = useSelector((state: RootState) => state.translation.history);
    const dispatch = useDispatch<AppDispatch>();

    const handleClear = () => {
        const confirmClear = window.confirm('Вы уверены, что хотите очистить историю переводов?');
        if (confirmClear) {
            dispatch(clearHistory());
        }
    };

    const truncateText = (text: string, maxLength: number = 50): string => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className={styles.historyContainer}>
            <div className={styles.header}>
                <h2>История переводов</h2>
                <button onClick={handleClear} className={styles.clearButton}>
                    Очистить историю
                </button>
            </div>
            {history.length === 0 ? (
                <p className={styles.emptyMessage}>История пуста.</p>
            ) : (
                <div className={styles.historyList}>
                    {history.map((item, index) => (
                        <div key={index} className={styles.historyItem}>
                            <div className={styles.languages}>
                                {item.fromLang === 'detect' ? 'Авто' : getLanguageName(item.fromLang)} &rarr; {getLanguageName(item.toLang)}
                            </div>
                            <div className={styles.originalText}>
                                {truncateText(item.originalText)}
                            </div>
                            <div className={styles.translatedText}>
                                {truncateText(item.translatedText)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TranslationHistory;
