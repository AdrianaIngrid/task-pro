import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail is invalid')
      .required('E-mail required'),
    password: Yup.string()
      .min(6, 'Minimum 6 characters is required')
      .required('Password required'),
  });