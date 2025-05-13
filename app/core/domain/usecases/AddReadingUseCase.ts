import { Reading} from '../entities/Reading.ts';
import {ReadingRepository} from '../repositories/ReadingRepository.ts';
export class AddReadingUseCase {
    constructor(private readingRepository: ReadingRepository) {}

    async execute(reading: Reading): Promise<void> {
        await this.readingRepository.save(reading);
    }
}
