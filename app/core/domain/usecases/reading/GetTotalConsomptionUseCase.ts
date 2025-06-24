import { ReadingRepository } from '@/core/domain/repositories/ReadingRepository';
export class GetTotalConsomptionUseCase {
    constructor(private readingRepository: ReadingRepository) {
    }
    async execute(userId: string): Promise<number> {
        return await this.readingRepository.getTotalElectricConsumption(userId);
    }
}
