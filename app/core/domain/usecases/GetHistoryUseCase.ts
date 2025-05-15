import { Reading } from '@/core/domain/entities/Reading';
import { ReadingRepository } from '@/core/domain/repositories/ReadingRepository';
export class GetHistoryUseCase {
    constructor(private readingRepository: ReadingRepository) {
    }

    async execute(): Promise<Reading[]> {
        return await this.readingRepository.getAll();
    }
}
