import {UserRepository} from "@/core/domain/repositories/UserRepository.ts";

export class UpdatePhotoUrlUseCase{

    constructor(private userRepository: UserRepository){}
    async execute(photoURL: string): Promise<void>{
        await this.userRepository.updatePhoto(photoURL);
    }
}
