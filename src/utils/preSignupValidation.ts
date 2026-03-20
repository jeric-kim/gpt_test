import { FormErrors, FormValues } from '../types/preSignup';

export const initialFormValues: FormValues = {
  fullName: '',
  englishName: '',
  email: '',
  mobile: '',
  nationality: '',
  preferredLanguage: 'English',
  arrivalDate: '',
  services: ['pre-signup'],
  remittanceCountry: '',
  marketingConsent: false,
  privacyConsent: false,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[+]?[-()\s0-9]{8,20}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export function validateField(field: keyof FormValues, values: FormValues): string {
  const value = values[field];

  switch (field) {
    case 'fullName':
      return values.fullName.trim().length >= 2 ? '' : 'Please enter your full name.';
    case 'englishName':
      return values.englishName.trim().length >= 2 ? '' : 'Please enter your English name.';
    case 'email':
      return emailRegex.test(values.email.trim()) ? '' : 'Enter a valid email address.';
    case 'mobile':
      return mobileRegex.test(values.mobile.trim()) ? '' : 'Enter a valid mobile number.';
    case 'nationality':
      return values.nationality ? '' : 'Please select your nationality.';
    case 'preferredLanguage':
      return values.preferredLanguage ? '' : 'Please select a preferred language.';
    case 'arrivalDate':
      return dateRegex.test(values.arrivalDate) ? '' : 'Use YYYY-MM-DD format.';
    case 'services':
      return values.services.length > 0 ? '' : 'Select at least one service.';
    case 'remittanceCountry':
      if (!values.services.includes('remittance')) {
        return '';
      }
      if (!values.remittanceCountry) {
        return 'Select a remittance destination.';
      }
      if (values.remittanceCountry === 'unsupported') {
        return 'Remittance is not available for that destination yet.';
      }
      return '';
    case 'privacyConsent':
      return values.privacyConsent ? '' : 'You must agree to the privacy notice and terms.';
    case 'marketingConsent':
      return '';
    default:
      return typeof value === 'string' && value ? '' : '';
  }
}

export function validateStep(values: FormValues, step: number): FormErrors {
  const fieldsByStep: Array<Array<keyof FormValues>> = [
    ['fullName', 'englishName', 'email', 'mobile'],
    ['nationality', 'preferredLanguage', 'arrivalDate', 'services'],
    ['remittanceCountry', 'privacyConsent'],
  ];

  return fieldsByStep[step].reduce<FormErrors>((errors, field) => {
    const error = validateField(field, values);
    if (error) {
      errors[field] = error;
    }
    return errors;
  }, {});
}

export function validateAll(values: FormValues): FormErrors {
  const fields: Array<keyof FormValues> = [
    'fullName',
    'englishName',
    'email',
    'mobile',
    'nationality',
    'preferredLanguage',
    'arrivalDate',
    'services',
    'remittanceCountry',
    'privacyConsent',
  ];

  return fields.reduce<FormErrors>((errors, field) => {
    const error = validateField(field, values);
    if (error) {
      errors[field] = error;
    }
    return errors;
  }, {});
}

export function isFormSubmittable(values: FormValues): boolean {
  return Object.keys(validateAll(values)).length === 0;
}
