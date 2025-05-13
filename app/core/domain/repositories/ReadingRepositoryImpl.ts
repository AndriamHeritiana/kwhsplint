import {ReadingRepository} from './ReadingRepository.ts';
import {Reading} from '../entities/Reading.ts';
import {SQLiteService} from '../../../infrastructure/storage/SQLiteService.ts';
export class ReadingRepositoryImpl implements ReadingRepository {
    private sqliteService: SQLiteService;

    constructor(sqliteService: SQLiteService) {
        this.sqliteService = sqliteService;
    }

    async save(reading: Reading): Promise<void> {
        await this.sqliteService.saveReading(reading);
    }

    async getAll(): Promise<Reading[]> {
        return await this.sqliteService.getAllReadings();
    }
}
