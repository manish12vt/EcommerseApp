import * as Yup from 'yup';

export const loginValidationRules = Yup.object().shape({
  email: Yup.string()
    .required('This field is required')
    .email('Must be a valid email'),
  password: Yup.string()
    .required('This field is required')
});