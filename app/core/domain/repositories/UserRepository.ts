import { User } from '@/core/domain/entities/User';

export interface UserRepository {
    updatePhoto(photoURL: string): Promise<void>;
}
