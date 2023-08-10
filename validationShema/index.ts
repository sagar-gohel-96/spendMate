import * as yup from 'yup';

export const transactionValidationSchema = yup.object().shape({
  category: yup.string().required('Category is required'),
  date: yup.date().required('Date is required'),
  transactionType: yup.string().required('Type is required'),
  amount: yup.number().integer().required('Amount is required'),
});
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const logInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, 'Email is not valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(passwordRegex, 'Password contain at least one special character')
    .required('Password is required'),
});

export const signUpValidationSchema = yup.object().shape({
  name: yup.string().min(3).required('Name is required'),
  email: yup
    .string()
    .matches(emailRegex, 'Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(passwordRegex, 'Password contain at least one special character')
    .required('Password is required'),
});
