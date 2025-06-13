import { Reading } from '@/core/domain/entities/Reading';
import { ReadingRepository } from '@/core/domain/repositories/ReadingRepository';

export class GetTwoLastHistoryUseCase {
    constructor(private readingRepository: ReadingRepository) {
    }

    async execute(userId: string, searchTerm?: string): Promise<Reading[]> {
        return await this.readingRepository.getTwoLastReadings(userId, searchTerm); // Passe searchTerm
    }
}
