import * as Yup from 'yup';

export const readingFormValidationSchema = Yup.object().shape({
    newInputDate: Yup.date()
        .required('Date is required')
        .min(new Date(), 'The date cannot be in the past'),
    oldInputDate: Yup.date().required('Old date is required'),
    mainCounterValue: Yup.number()
        .required('Main counter value is required')
        .positive('Value must be positive')
        .typeError('You must specify a number'),
    newSubMeterValue: Yup.number()
        .required('Sub-meter value is required')
        .positive('Value must be positive')
        .typeError('You must specify a number'),
    oldSubMeterValue: Yup.number()
        .required('Sub-meter value is required')
        .positive('Value must be positive')
        .typeError('You must specify a number'),
    amountInvoice: Yup.number()
        .required('Amount in invoice is required')
        .positive('Value must be positive')
        .typeError('You must specify a number'),
    amountToPay: Yup.number()
        .required('Amount to pay is required')
        .positive('Value must be positive')
        .typeError('You must specify a number'),
    residence: Yup.string()
        .required('Residence is required'),
    city: Yup.string()
        .required('City is required'),
    userId: Yup.string().required('userId is required'),
});
