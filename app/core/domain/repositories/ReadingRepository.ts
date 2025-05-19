import {Reading} from '@/core/domain/entities/Reading';
export interface ReadingRepository {
    save(reading: Reading): Promise<void>;
    getAll(searchTerm?: string): Promise<Reading[]>;
    getTwoLastReadings(searchTerm?: string): Promise<Reading[]>;
}
