export class Reading {
    id: number | null;
    newInputDate: string;
    oldInputDate: string;
    mainCounterValue: number;
    newSubMeterValue: number;
    oldSubMeterValue: number;
    amountInvoice: number;
    amountToPay: number;

    constructor(data: {
        id: number | null;
        newInputDate: string;
        oldInputDate: string;
        mainCounterValue: number;
        newSubMeterValue: number;
        oldSubMeterValue: number;
        amountInvoice: number;
        amountToPay: number;
    }) {
        this.id = data.id;
        this.newInputDate = data.newInputDate;
        this.oldInputDate = data.oldInputDate;
        this.mainCounterValue = data.mainCounterValue;
        this.newSubMeterValue = data.newSubMeterValue;
        this.oldSubMeterValue = data.oldSubMeterValue;
        this.amountInvoice = data.amountInvoice;
        this.amountToPay = data.amountToPay;
    }
}
