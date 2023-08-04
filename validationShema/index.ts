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
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const logInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(passwordRegex, 'Password contain at least one special character'),
});

export const signUpValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(3),
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Invalid email address'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
