import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Reading } from '@/core/domain/entities/Reading.ts';
import { SQLiteService } from '@/infrastructure/storage/SQLiteService.ts';
import { ReadingRepositoryImpl } from '@/core/data/repositories/ReadingRepositoryImpl.ts';
import { GetHistoryUseCase } from '@/core/domain/usecases/GetHistoryUseCase.ts';
import { AddReadingUseCase } from '@/core/domain/usecases/AddReadingUseCase.ts';

// Initialisation des services
const sqliteService = new SQLiteService();
const readingRepository = new ReadingRepositoryImpl(sqliteService);
const getHistoryUseCase = new GetHistoryUseCase(readingRepository);
const addReadingUseCase = new AddReadingUseCase(readingRepository);

// État initial
interface ReadingState {
    readings: Reading[];
    loading: boolean;
    error: string | null;
    isDbReady: boolean;
}

const initialState: ReadingState = {
    readings: [],
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
export const fetchReadings = createAsyncThunk('reading/fetchReadings', async (searchTerm?: string) => {
    return await getHistoryUseCase.execute(searchTerm);
});

// Thunk pour ajouter une lecture
export const addReading = createAsyncThunk('reading/addReading', async (reading: Reading) => {
    await addReadingUseCase.execute(reading);
    return reading; // Retourne uniquement la nouvelle lecture ajoutée
});

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
                state.error = action.error.message || 'Erreur lors de l\'initialisation de la base de données';
            })
            .addCase(fetchReadings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReadings.fulfilled, (state, action) => {
                state.readings = action.payload;
                state.loading = false;
            })
            .addCase(fetchReadings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Erreur lors de la récupération des lectures';
            })
            .addCase(addReading.pending, (state) => {
                state.loading = true;
            })
            .addCase(addReading.fulfilled, (state, action) => {
                state.readings = [action.payload, ...state.readings]; // Ajoute la nouvelle lecture en tête de liste
                state.loading = false;
            })
            .addCase(addReading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Erreur lors de l\'ajout de la lecture';
            });
    },
});

export const { clearError } = readingSlice.actions;
export default readingSlice.reducer;
