import * as yup from 'yup';

export const transactionValidationSchema = yup.object().shape({
  category: yup.string().required('Category is required'),
  date: yup.date().required('Date is required').min(new Date()),
  description: yup.string().required('Description is required'),
  type: yup.string().required('Type is required'),
  amount: yup
    .number()
    .required('Amount is required')
    .min(0, 'Amount must be greater than or equal to 0'),
});
