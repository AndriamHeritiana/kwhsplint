import { User } from '@/core/domain/entities/User';

export interface AuthDataSource {
    signIn(email: string, password: string): Promise<User>;
    signUp(email: string, password: string, latitude: string, longitude: string,  displayName?: string): Promise<User>;
    signOut(): Promise<void>;
    getCurrentUser(): Promise<User | null>;
}
