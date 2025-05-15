import { useMemo } from 'react';
import { CalculateAmountToPayUseCase } from '@/core/domain/usecases/CalculateAmountToPayUseCase.ts';
import {FormikErrors} from 'formik';
interface FormValues {
    newInputDate: Date;
    oldInputDate: Date;
    mainCounterValue: string;
    newSubMeterValue: string;
    oldSubMeterValue: string;
    amountInvoice: string;
    amountToPay: string;
}
export const useCalculateAmountToPay = (
  values: FormValues,
  errors: FormikErrors<FormValues>,
  calculateAmountToPayUseCase: CalculateAmountToPayUseCase,
) => {
  return useMemo(() => {
    const {
      newSubMeterValue,
      oldSubMeterValue,
      mainCounterValue,
      amountInvoice,
    } = values;

    if (
      newSubMeterValue &&
      oldSubMeterValue &&
      mainCounterValue &&
      amountInvoice &&
      !errors.newSubMeterValue &&
      !errors.oldSubMeterValue &&
      !errors.mainCounterValue &&
      !errors.amountInvoice
    ) {
      const reading : any = {
        newInputDate: values.newInputDate,
        oldInputDate: values.oldInputDate,
        mainCounterValue: parseFloat(mainCounterValue),
        newSubMeterValue: parseFloat(newSubMeterValue),
        oldSubMeterValue: parseFloat(oldSubMeterValue),
        amountInvoice: parseFloat(amountInvoice),
        amountToPay: 0,
      };

      return calculateAmountToPayUseCase.execute(reading).toString();
    }
    return '';
  }, [
    values,
    errors.newSubMeterValue,
    errors.oldSubMeterValue,
    errors.mainCounterValue,
    errors.amountInvoice,
    calculateAmountToPayUseCase,
  ]);
};
