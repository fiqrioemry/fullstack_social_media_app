import { clsx } from 'clsx';
import * as Yup from 'yup';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDateToISO(date) {
  if (date && !isNaN(new Date(date))) {
    return new Date(date).toISOString().split('T')[0];
  }
  return '';
}

export function formatFormDataDates(data, dateFields = []) {
  const formattedDates = {};

  dateFields.forEach((field) => {
    if (data[field]) {
      formattedDates[field] = formatDateToISO(data[field]);
    }
  });

  return formattedDates;
}
const baseValidations = {
  fullname: Yup.string()
    .min(6, 'Min. 6 characters')
    .required('Fullname is required'),
  username: Yup.string()
    .min(8, 'Min 8 characters')
    .matches(
      /^(?!.*[_.]{2})[a-zA-Z0-9][a-zA-Z0-9._]{6,}[a-zA-Z0-9]$/,
      "Cannot contain '.' or '_' at the beginning or end",
    )
    .required('Username is required'),
  password: Yup.string()
    .min(5, 'Min. 5 characters')
    .required('Password is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  otp: Yup.string().min(6, 'Min. 6 digits').required('OTP is required'),
  identifier: Yup.string()
    .test(
      'is-email-or-username',
      'Must be a valid email or username',
      (value) => {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex =
          /^(?!.*[_.]{2})[a-zA-Z0-9][a-zA-Z0-9._]{6,}[a-zA-Z0-9]$/;
        return emailRegex.test(value) || usernameRegex.test(value);
      },
    )
    .required('Email or username is required'),
  message: Yup.string()
    .trim()
    .test(
      'message-or-image',
      'Message or image must be provided',
      function (value) {
        const { image } = this.parent;
        return !!image || (value && value.length > 0);
      },
    ),
  image: Yup.mixed().test(
    'image-or-message',
    'Message or image must be provided',
    function (value) {
      const { message } = this.parent;
      return !!message || value;
    },
  ),
};

export const newValidationSchema = (fields = []) => {
  const schemaFields = {};
  fields.forEach((field) => {
    if (baseValidations[field.name]) {
      schemaFields[field.name] = baseValidations[field.name];
    }
  });

  return Yup.object().shape(schemaFields);
};
