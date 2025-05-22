import { User } from '@/core/domain/entities/User';

export interface AuthRepository {
    signIn(email: string, password: string): Promise<User>;
    signUp(email: string, password: string, displayName?: string): Promise<User>;
    signOut(): Promise<void>;
    getCurrentUser(): Promise<User | null>;
}

export class SignInUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(email: string, password: string): Promise<User> {
        return this.authRepository.signIn(email, password);
    }
}

export class SignUpUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(email: string, password: string, displayName?: string): Promise<User> {
        return this.authRepository.signUp(email, password, displayName);
    }
}

export class SignOutUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(): Promise<void> {
        return this.authRepository.signOut();
    }
}

export class GetCurrentUserUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(): Promise<User | null> {
        return this.authRepository.getCurrentUser();
    }
}
