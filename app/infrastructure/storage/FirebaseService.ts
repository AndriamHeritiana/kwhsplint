import { FirebaseAuthDataSource } from '@/core/data/datasources/FirebaseAuthDataSource';
import { AuthRepositoryImpl } from '@/core/data/repositories/AuthRepositoryImpl';
import { SignInUseCase } from '@/core/domain/usecases/user/SignInUseCase';
import { SignUpUseCase } from '@/core/domain/usecases/user/SignUpUseCase';
import { SignOutUseCase } from '@/core/domain/usecases/user/SignOutUseCase';
import { GetCurrentUserUseCase } from '@/core/domain/usecases/user/GetCurrentUserUseCase';
import { NominatimGeocodingService} from "@/infrastructure/services/NominatimGeocodingService.ts";
import {FirebaseAuthService} from "@/infrastructure/services/FirebaseAuthService.ts";
import {FirestoreUserRepository} from "@/core/data/repositories/FirestoreUserRepository.ts";

export class FirebaseService {
    private static geocodingService = new NominatimGeocodingService();
    private static authService = new FirebaseAuthService();
    private static userRepository = new FirestoreUserRepository();
    private static authDataSource = new FirebaseAuthDataSource(this.authService, this.userRepository, this.geocodingService);
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
