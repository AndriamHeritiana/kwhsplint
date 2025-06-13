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

    async getAll(userId: string, searchTerm?: string): Promise<Reading[]> {
        return await this.sqliteService.getReadings(userId, searchTerm );
    }

    async getTwoLastReadings(userId: string, searchTerm?: string): Promise<Reading[]> {
        return await this.sqliteService.getReadings(userId, searchTerm, 2);
    }
    async getTotalAmountToPay(userId: string): Promise<number> {
        return await this.sqliteService.getTotalAmountToPay(userId);
    }
    async getLatestMeterAndDateReading(userId: string): Promise<{ newInputDate: string; newSubMeterValue: number } | null> {
        return await this.sqliteService.getLatestMeterAndDateReading(userId);
    }
}
