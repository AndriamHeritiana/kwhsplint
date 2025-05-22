import { FirebaseAuthDataSource } from "@/core/data/datasources/FirebaseAuthDataSource.ts";
import { AuthRepositoryImpl } from "@/core/data/repositories/AuthRepositoryImpl.ts";
import {
    SignInUseCase,
    SignUpUseCase,
    SignOutUseCase,
    GetCurrentUserUseCase,
} from "@/core/domain/usecases/user/AuthUseCases.ts";

export class FirebaseService {
    private static authDataSource = new FirebaseAuthDataSource();
    private static authRepository = new AuthRepositoryImpl(this.authDataSource);

    static getSignInUseCase(): SignInUseCase {
        return new SignInUseCase(this.authRepository);
    }

    static getSignUpUseCase(): SignUpUseCase {
        return new SignUpUseCase(this.authRepository);
    }

    static getSignOutUseCase(): SignOutUseCase {
        return new SignOutUseCase(this.authRepository);
    }

    static getGetCurrentUserUseCase(): GetCurrentUserUseCase {
        return new GetCurrentUserUseCase(this.authRepository);
    }
}
