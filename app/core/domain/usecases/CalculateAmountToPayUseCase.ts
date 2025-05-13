import { Reading } from '../entities/Reading';
export class CalculateAmountToPayUseCase{
    execute(reading: Reading): number {
        const subMeterConsumption = reading.newSubMeterValue - reading.oldSubMeterValue;
        if (subMeterConsumption <= 0 || reading.mainCounterValue <= 0){
            return 0;
        }
        const amountToPay = (subMeterConsumption * reading.amountInvoice) / reading.mainCounterValue;
        return Number(amountToPay.toFixed(2));
    }
}
