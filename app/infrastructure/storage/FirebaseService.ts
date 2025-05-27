import { FirebaseAuthDataSource } from '@/core/data/datasources/FirebaseAuthDataSource';
import { AuthRepositoryImpl } from '@/core/data/repositories/AuthRepositoryImpl';
import { SignInUseCase } from '@/core/domain/usecases/user/SignInUseCase';
import { SignUpUseCase } from '@/core/domain/usecases/user/SignUpUseCase';
import { SignOutUseCase } from '@/core/domain/usecases/user/SignOutUseCase';
import { GetCurrentUserUseCase } from '@/core/domain/usecases/user/GetCurrentUserUseCase';

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
