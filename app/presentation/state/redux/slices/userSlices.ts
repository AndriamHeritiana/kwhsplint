import {User} from "@/core/domain/entities/User.ts";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {FirebaseService} from "@/infrastructure/storage/FirebaseService.ts";

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isReady: boolean;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    isReady: false,
};
export const getUpdatePhoto = createAsyncThunk(
    "user/updatePhoto",
    async (photo: string, { rejectWithValue }) => {
        try {
            await FirebaseService.getUpdatePhotoUrlUseCase().execute(photo);
            return photo; // Retourne l'URL pour mettre à jour l'état
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Échec de la mise à jour de la photo"
            );
        }
    }
);
const userSlices = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUpdatePhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUpdatePhoto.fulfilled, (state, action) => {
                state.loading = false;
                if (state.user) {
                    state.user = {...state.user, photoURL: action.payload};
                }
                state.isReady = true;
            })
            .addCase(getUpdatePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isReady = true;
            });
    },
});
export default userSlices.reducer;
