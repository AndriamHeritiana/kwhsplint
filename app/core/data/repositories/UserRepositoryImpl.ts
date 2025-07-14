import {UserRepository} from "@/core/domain/repositories/UserRepository.ts";
import {UserDataSource} from "@/core/data/datasources/UserDataSource.ts";

export class UserRepositoryImpl implements UserRepository{
    constructor(private userDataSource: UserDataSource) {
    }
    async updatePhoto(photoURL:string): Promise<void> {
        return await this.userDataSource.updatePhoto(photoURL);
    }
}
