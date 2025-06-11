import { AuthRepository} from "@/core/domain/repositories/AuthRepository.ts";
import { User } from "@/core/domain/entities/User.ts";
export class SignOutUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(): Promise<void> {
        return this.authRepository.signOut();
    }
}
