
import { ReadingRepository } from '@/core/domain/repositories/ReadingRepository';

export class GetLatestMeterAndDateReadingUseCase {
    constructor(private readingRepository: ReadingRepository) {
    }

    async execute(userId: string): Promise<{ newInputDate: string; newSubMeterValue: number } | null> {
        return await this.readingRepository.getLatestMeterAndDateReading(userId);
    }
}
