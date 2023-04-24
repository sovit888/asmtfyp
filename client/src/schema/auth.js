import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email'),
  password: yup.string().required('Password is required'),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email'),
  password: yup.string().required('Password is required'),
  username: yup.string().required('Username is required'),
});
