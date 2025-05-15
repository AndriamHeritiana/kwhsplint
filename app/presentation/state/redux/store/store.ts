import { configureStore } from '@reduxjs/toolkit';
import readingReducer from './readingSlice.ts';
import { navigationMiddleware } from '@/presentation/state/redux/middlewares/navigationMiddleware';

export const store = configureStore({
    reducer: {
        reading: readingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(navigationMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
