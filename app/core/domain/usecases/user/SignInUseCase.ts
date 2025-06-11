import { AuthRepository} from "@/core/domain/repositories/AuthRepository.ts";
import { User } from "@/core/domain/entities/User.ts";
export class SignInUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(email: string, password: string): Promise<User> {
        return this.authRepository.signIn(email, password);
    }
}
