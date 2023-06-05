import * as yup from 'yup';

export const transactionValidationSchema = yup.object().shape({
  category: yup.string().required('Category is required'),
  date: yup.date().required('Date is required'),
  transactionType: yup.string().required('Type is required'),
  amount: yup
    .number()
    .required('Amount is required')
    .min(0, 'Amount must be greater than or equal to 0'),
});
