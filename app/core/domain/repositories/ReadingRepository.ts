import {Reading} from '@/core/domain/entities/Reading';
export interface ReadingRepository {
    save(reading: Reading): Promise<void>;
    getAll(userId: string, searchTerm?: string): Promise<Reading[]>;
    getTwoLastReadings(userId: string, searchTerm?: string): Promise<Reading[]>;
}
