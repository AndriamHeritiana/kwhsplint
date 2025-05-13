import { Reading } from '../entities/Reading';
export interface ReadingRepository {
    save(reading: Reading): Promise<void>;
    getAll(): Promise<Reading[]>;
}
