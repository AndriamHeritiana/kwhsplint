import { AuthRepository} from "@/core/domain/repositories/AuthRepository.ts";
import { User } from "@/core/domain/entities/User.ts";
export class SignUpUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(email: string, password: string,latitude: string, longitude: string,  displayName?: string,): Promise<User> {
        return this.authRepository.signUp(email, password, latitude, longitude, displayName);
    }
}
