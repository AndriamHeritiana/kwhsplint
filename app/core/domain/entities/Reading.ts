export class Reading {
    id: number | null;
    userId: string;
    newInputDate: string;
    oldInputDate: string;
    mainCounterValue: number;
    newSubMeterValue: number;
    oldSubMeterValue: number;
    amountInvoice: number;
    amountToPay: number;
    residence: string;
    city: string;

    constructor(data: {
        id: number | null;
        userId: string;
        newInputDate: string;
        oldInputDate: string;
        mainCounterValue: number;
        newSubMeterValue: number;
        oldSubMeterValue: number;
        amountInvoice: number;
        amountToPay: number;
        residence: string;
        city: string;
    }) {
        this.id = data.id;
        this.userId = data.userId;
        this.newInputDate = data.newInputDate;
        this.oldInputDate = data.oldInputDate;
        this.mainCounterValue = data.mainCounterValue;
        this.newSubMeterValue = data.newSubMeterValue;
        this.oldSubMeterValue = data.oldSubMeterValue;
        this.amountInvoice = data.amountInvoice;
        this.amountToPay = data.amountToPay;
        this.residence = data.residence;
        this.city = data.city;
    }
}
