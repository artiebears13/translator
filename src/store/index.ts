import { configureStore } from '@reduxjs/toolkit';
import translationReducer from './translationSlice';

const store = configureStore({
    reducer: {
        translation: translationReducer,
    },
});

store.subscribe(() => {
    try {
        const state = store.getState();
        const serializedState = JSON.stringify(state.translation.history);
        localStorage.setItem('translationHistory', serializedState);
    } catch (err) {
        console.error('Не удалось сохранить историю переводов в localStorage:', err);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
