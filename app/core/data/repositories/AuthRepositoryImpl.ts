import { AuthRepository } from "../../domain/usecases/user/AuthUseCases";
import { AuthDataSource } from "../datasources/AuthDataSource";
import { User } from "../../domain/entities/User";

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private authDataSource: AuthDataSource) {}

    async signIn(email: string, password: string): Promise<User> {
        return this.authDataSource.signIn(email, password);
    }

    async signUp(email: string, password: string, displayName?: string): Promise<User> {
        return this.authDataSource.signUp(email, password, displayName);
    }

    async signOut(): Promise<void> {
        return this.authDataSource.signOut();
    }

    async getCurrentUser(): Promise<User | null> {
        return this.authDataSource.getCurrentUser();
    }
}
