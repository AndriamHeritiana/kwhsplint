export class Reading {
    constructor(
        public id: number | null,
        public newInputDate: Date,
        public oldInputDate: Date,
        public mainCounterValue: number,
        public newSubMeterValue: number,
        public oldSubMeterValue: number,
        public amountInvoice: number,
        public amountToPay: number
    ) {}
}
