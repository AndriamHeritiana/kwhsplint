import { RootState } from "../store/store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthIsReady = (state: RootState) => state.auth.isReady;
