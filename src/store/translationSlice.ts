import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITranslationResult } from '../utils/interface';

interface TranslationState {
    history: ITranslationResult[];
}

const loadHistory = (): TranslationState['history'] => {
    try {
        const serializedState = localStorage.getItem('translationHistory');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Не удалось загрузить историю переводов из localStorage:', err);
        return [];
    }
};

const initialState: TranslationState = {
    history: loadHistory(),
};

const translationSlice = createSlice({
    name: 'translation',
    initialState,
    reducers: {
        addTranslation: (state, action: PayloadAction<ITranslationResult>) => {
            state.history.unshift(action.payload);
            if (state.history.length > 100) {
                state.history.pop();
            }
        },
        setHistory: (state, action: PayloadAction<ITranslationResult[]>) => {
            state.history = action.payload;
        },
        clearHistory: (state) => {
            state.history = [];
        },
    },
});

export const { addTranslation, setHistory, clearHistory } = translationSlice.actions;

export default translationSlice.reducer;
