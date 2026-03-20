import { BenefitCard, FAQItem, SelectOption, StepItem } from '../types/preSignup';

export const trustBadges = [
  'Mobile-first guided flow',
  'Clear next steps before arrival',
  'Foreigner-friendly support',
];

export const benefitCards: BenefitCard[] = [
  {
    icon: '✨',
    title: 'Easy pre-signup',
    description:
      'Reserve your interest in minutes and get a simple checklist before full onboarding starts.',
  },
  {
    icon: '🌍',
    title: 'Built for foreign residents',
    description:
      'Friendly guidance for newcomers who may be unfamiliar with Korean financial and telecom setup.',
  },
  {
    icon: '📲',
    title: 'Mobile-first journey',
    description:
      'Short steps, large touch targets, and smart reminders designed for phone-based onboarding.',
  },
  {
    icon: '🛡️',
    title: 'Trust and transparency',
    description:
      'See supported remittance destinations, required documents, and privacy notices upfront.',
  },
];

export const supportedCountries: SelectOption[] = [
  'Vietnam',
  'China',
  'Philippines',
  'Nepal',
  'Cambodia',
  'Indonesia',
  'United States',
  'Canada',
  'Australia',
  'United Kingdom',
  'Singapore',
  'Malaysia',
  'Thailand',
  'Myanmar',
].map((label) => ({ label, value: label, supported: true }));

export const remittanceDestinationOptions: SelectOption[] = [
  ...supportedCountries,
  {
    label: 'My destination is not listed yet',
    value: 'unsupported',
    description: 'You can still pre-sign up and receive updates when more destinations open.',
    supported: false,
  },
];

export const nationalityOptions: SelectOption[] = [
  'Vietnamese',
  'Chinese',
  'Filipino',
  'Nepalese',
  'Cambodian',
  'Indonesian',
  'American',
  'Canadian',
  'Australian',
  'British',
  'Singaporean',
  'Malaysian',
  'Thai',
  'Myanmar',
  'Other',
].map((label) => ({ label, value: label }));

export const languageOptions: SelectOption[] = [
  { label: 'English', value: 'English' },
  { label: 'Korean', value: 'Korean' },
  { label: 'Vietnamese', value: 'Vietnamese' },
  { label: 'Chinese', value: 'Chinese' },
  { label: 'Filipino', value: 'Filipino' },
  { label: 'Nepali', value: 'Nepali' },
  { label: 'Indonesian', value: 'Indonesian' },
  { label: 'Thai', value: 'Thai' },
];

export const serviceOptions = [
  { label: 'Pre-signup', value: 'pre-signup' },
  { label: 'Account opening preparation', value: 'account-prep' },
  { label: 'SIM registration guidance', value: 'sim-guidance' },
  { label: 'Remittance service', value: 'remittance' },
] as const;

export const onboardingSteps: StepItem[] = [
  {
    title: 'Pre-sign up',
    description: 'Share your details and preferred services so our team can prepare the right guidance.',
  },
  {
    title: 'Prepare documents',
    description: 'Receive a simple checklist for account opening and identity verification readiness.',
  },
  {
    title: 'Get onboarding guidance',
    description: 'Follow mobile-friendly support after arrival or when your onboarding window opens.',
  },
  {
    title: 'Start using remittance-related services',
    description: 'Complete activation steps and begin using eligible services for supported destinations.',
  },
];

export const faqs: FAQItem[] = [
  {
    question: 'Who can pre-sign up?',
    answer:
      'Foreign prospective customers who want early guidance for onboarding, account preparation, or remittance-related services in Korea can pre-sign up.',
  },
  {
    question: 'Is this the final account opening?',
    answer:
      'No. This page is for pre-signup only. Full account opening and identity verification happen later in the guided onboarding process.',
  },
  {
    question: 'Which countries are currently supported for remittance?',
    answer:
      'Current remittance destination support includes Vietnam, China, Philippines, Nepal, Cambodia, Indonesia, United States, Canada, Australia, United Kingdom, Singapore, Malaysia, Thailand, and Myanmar.',
  },
  {
    question: 'Can I complete everything on mobile?',
    answer:
      'This pre-signup flow is optimized for mobile, and later onboarding steps are designed to remain mobile-friendly whenever possible.',
  },
  {
    question: 'What happens after pre-signup?',
    answer:
      'You receive follow-up guidance, eligibility reminders, and the next actions to prepare for onboarding and service activation.',
  },
];

export const heroHighlights = [
  { value: '5 min', label: 'average pre-signup time' },
  { value: '14', label: 'supported remittance destinations' },
  { value: 'Mobile', label: 'guided journey from start to next steps' },
];
