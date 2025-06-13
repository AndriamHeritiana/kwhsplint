import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Reading } from '@/core/domain/entities/Reading.ts';
import { SQLiteService } from '@/infrastructure/storage/SQLiteService.ts';
import { ReadingRepositoryImpl } from '@/core/data/repositories/ReadingRepositoryImpl.ts';
import { GetHistoryUseCase } from '@/core/domain/usecases/GetHistoryUseCase.ts';
import { AddReadingUseCase } from '@/core/domain/usecases/AddReadingUseCase.ts';
import { GetTwoLastHistoryUseCase } from '@/core/domain/usecases/GetTwoLastHistoryUseCase';
import { GetAmountToPayUseCase } from '@/core/domain/usecases/user/GetAmountToPayUseCase.ts';

// Initialisation des services
const sqliteService = new SQLiteService();
const readingRepository = new ReadingRepositoryImpl(sqliteService);
const getHistoryUseCase = new GetHistoryUseCase(readingRepository);
const getTwoLastHistoryUseCase = new GetTwoLastHistoryUseCase(readingRepository);
const addReadingUseCase = new AddReadingUseCase(readingRepository);
const getAmountToPayUseCase = new GetAmountToPayUseCase(readingRepository);

// État initial
interface ReadingState {
    homeReadings: Reading[];
    historyReadings: Reading[];
    totalAmountToPay: number;
    loading: boolean;
    error: string | null;
    isDbReady: boolean;
}

const initialState: ReadingState = {
    homeReadings: [],
    historyReadings: [],
    totalAmountToPay: 0.0,
    loading: false,
    error: null,
    isDbReady: false,
};

// Thunk pour initialiser la base de données
export const initializeDatabase = createAsyncThunk('reading/initializeDatabase', async () => {
    await sqliteService.openDatabase();
    return true;
});

// Thunk pour récupérer les lectures
export const fetchReadings = createAsyncThunk(
    'reading/fetchReadings',
    async ({ userId, searchTerm }: { userId: string; searchTerm?: string }) => {
        return await getHistoryUseCase.execute(userId, searchTerm);
    }
);

export const fetchTwoLastReadings = createAsyncThunk(
    'reading/fetchTwoLastReadings',
    async ({ userId, searchTerm }: { userId: string; searchTerm?: string }) => {
        return await getTwoLastHistoryUseCase.execute(userId, searchTerm);
    }
);

// Thunk pour ajouter une lecture et mettre à jour la somme totale
export const addReadingAndUpdateTotal = createAsyncThunk(
    'reading/addReadingAndUpdateTotal',
    async (reading: Reading, { dispatch }) => {
        await addReadingUseCase.execute(reading);
        const totalAmount = await getAmountToPayUseCase.execute(reading.userId);
        return { reading, totalAmount };
    }
);

// Thunk pour récupérer la somme totale à payer
export const fetchAmountToPay = createAsyncThunk(
    'reading/fetchAmountToPay',
    async (userId: string) => {
        return await getAmountToPayUseCase.execute(userId);
    }
);

// Slice Redux
const readingSlice = createSlice({
    name: 'reading',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeDatabase.pending, (state) => {
                state.loading = true;
            })
            .addCase(initializeDatabase.fulfilled, (state) => {
                state.isDbReady = true;
                state.loading = false;
            })
            .addCase(initializeDatabase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Erreur lors de l'initialisation de la base de données";
            })
            .addCase(fetchReadings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReadings.fulfilled, (state, action) => {
                state.historyReadings = action.payload;
                state.loading = false;
            })
            .addCase(fetchReadings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Erreur lors de la récupération des lectures';
            })
            .addCase(fetchTwoLastReadings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTwoLastReadings.fulfilled, (state, action) => {
                state.homeReadings = action.payload;
                state.loading = false;
            })
            .addCase(fetchTwoLastReadings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Erreur lors de la récupération des lectures';
            })
            .addCase(addReadingAndUpdateTotal.pending, (state) => {
                state.loading = true;
            })
            .addCase(addReadingAndUpdateTotal.fulfilled, (state, action) => {
                const { reading, totalAmount } = action.payload;
                state.historyReadings = [reading, ...state.historyReadings];
                state.homeReadings = [reading, ...state.homeReadings];
                state.totalAmountToPay = totalAmount; // Mise à jour de la somme totale
                state.loading = false;
            })
            .addCase(addReadingAndUpdateTotal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Erreur lors de l'ajout de la lecture ou de la mise à jour du montant";
            })
            .addCase(fetchAmountToPay.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAmountToPay.fulfilled, (state, action) => {
                state.totalAmountToPay = action.payload;
                state.loading = false;
            })
            .addCase(fetchAmountToPay.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Erreur lors de la récupération du montant total";
            });
    },
});

export const { clearError } = readingSlice.actions;
export default readingSlice.reducer;
