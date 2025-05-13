export interface Reading {
    id?: string;
    newInputDate: Date;
    oldInputDate: Date;
    mainCounterValue: number;
    newSubMeterValue: number;
    oldSubMeterValue: number;
    amountInvoice: number;
    amountToPay: number;
}
