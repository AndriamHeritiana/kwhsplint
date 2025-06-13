import { Reading } from '@/core/domain/entities/Reading';
import { ReadingRepository } from '@/core/domain/repositories/ReadingRepository';
export class GetAmountToPayUseCase {
    constructor(private readingRepository: ReadingRepository) {
    }

    async execute(userId: string): Promise<number> {
        return await this.readingRepository.getTotalAmountToPay(userId);
    }
}
