import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FirebaseService } from "@/infrastructure/storage/FirebaseService.ts";
import { User } from "@/core/domain/entities/User.ts";

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

export const signIn = createAsyncThunk(
    "auth/signIn",
    async ({ email, password }: { email: string; password: string }) => {
        return await FirebaseService.getSignInUseCase().execute(email, password);
    }
);

export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ email, password, displayName }: { email: string; password: string; displayName?: string }) => {
        return await FirebaseService.getSignUpUseCase().execute(email, password, displayName);
    }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
    await FirebaseService.getSignOutUseCase().execute();
});

export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async () => {
    return await FirebaseService.getGetCurrentUserUseCase().execute();
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Erreur de connexion";
            })
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Erreur d'inscription";
            })
            .addCase(signOut.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export default authSlice.reducer;
