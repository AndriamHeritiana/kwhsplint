import { AuthRepository} from "@/core/domain/repositories/AuthRepository.ts";
import { User } from "@/core/domain/entities/User.ts";
export class GetCurrentUserUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(): Promise<User | null> {
        return this.authRepository.getCurrentUser();
    }
}
