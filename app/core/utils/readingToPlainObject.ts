import { Reading } from '@/core/domain/entities/Reading';

export function readingToPlainObject(reading: Reading) {
    return {
        id: reading.id,
        newInputDate: reading.newInputDate,
        oldInputDate: reading.oldInputDate,
        mainCounterValue: reading.mainCounterValue,
        newSubMeterValue: reading.newSubMeterValue,
        oldSubMeterValue: reading.oldSubMeterValue,
        amountInvoice: reading.amountInvoice,
        amountToPay: reading.amountToPay,
        residence: reading.residence,
        city: reading.city,
    };
}
