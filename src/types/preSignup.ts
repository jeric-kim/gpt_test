export type ServiceOption =
  | 'pre-signup'
  | 'account-prep'
  | 'sim-guidance'
  | 'remittance';

export type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export type SelectOption = {
  label: string;
  value: string;
  description?: string;
  supported?: boolean;
};

export type BenefitCard = {
  title: string;
  description: string;
  icon: string;
};

export type StepItem = {
  title: string;
  description: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type FormValues = {
  fullName: string;
  englishName: string;
  email: string;
  mobile: string;
  nationality: string;
  preferredLanguage: string;
  arrivalDate: string;
  services: ServiceOption[];
  remittanceCountry: string;
  marketingConsent: boolean;
  privacyConsent: boolean;
};

export type FormErrors = Partial<Record<keyof FormValues, string>>;
