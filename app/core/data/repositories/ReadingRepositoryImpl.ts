import {ReadingRepository} from '@/core/domain/repositories/ReadingRepository';
import {Reading} from '@/core/domain/entities/Reading';
import {SQLiteService} from '@/infrastructure/storage/SQLiteService.ts';
export class ReadingRepositoryImpl implements ReadingRepository {
    private sqliteService: SQLiteService;

    constructor(sqliteService: SQLiteService) {
        this.sqliteService = sqliteService;
    }

    async save(reading: Reading): Promise<void> {
        await this.sqliteService.saveReading(reading);
    }

    async getAll(searchTerm?: string): Promise<Reading[]> {
        return await this.sqliteService.getReadings(searchTerm);
    }

    async getTwoLastReadings(searchTerm?: string): Promise<Reading[]> {
        return await this.sqliteService.getReadings(searchTerm, 2);
    }
}
