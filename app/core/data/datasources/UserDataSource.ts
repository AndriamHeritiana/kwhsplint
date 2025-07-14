import { User } from '@/core/domain/entities/User';
export interface UserDataSource{
    updatePhoto(photoURL: string): Promise<void>;
}
