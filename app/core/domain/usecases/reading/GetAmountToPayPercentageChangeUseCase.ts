import { ReadingRepository } from '@/core/domain/repositories/ReadingRepository';

export class GetAmountToPayPercentageChangeUseCase{
    constructor(private readingRepository: ReadingRepository) {
    }
    async execute(userId: string): Promise<{
        currentMonthAmount: number;
        previousMonthAmount: number;
        percentageChange: number;
        hasData: boolean}| null> {
        return await this.readingRepository.getAmountToPayPercentageChange(userId);
    }
}
