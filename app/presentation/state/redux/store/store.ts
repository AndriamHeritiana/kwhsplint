import { configureStore } from '@reduxjs/toolkit';
import readingReducer from './readingSlice.ts';

export const store = configureStore({
    reducer: {
        reading: readingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
