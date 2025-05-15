import {Reading} from '@/core/domain/entities/Reading';
export interface ReadingRepository {
    save(reading: Reading): Promise<void>;
    getAll(): Promise<Reading[]>;
}
