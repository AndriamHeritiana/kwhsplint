import {Reading} from '@/core/domain/entities/Reading';
import {ReadingRepository} from '@/core/domain/repositories/ReadingRepository.ts';
export class AddReadingUseCase {
    constructor(private readingRepository: ReadingRepository) {}

    async execute(reading: Reading): Promise<void> {
        await this.readingRepository.save(reading);
    }
}
