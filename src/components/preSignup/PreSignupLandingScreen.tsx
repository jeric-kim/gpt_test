import React, { useMemo, useRef, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton } from '../ui/AppButton';
import { SectionHeader } from '../ui/SectionHeader';
import {
  benefitCards,
  faqs,
  heroHighlights,
  languageOptions,
  nationalityOptions,
  onboardingSteps,
  remittanceDestinationOptions,
  serviceOptions,
  supportedCountries,
  trustBadges,
} from '../../data/preSignupContent';
import { FormErrors, FormValues, SelectOption, ServiceOption, SubmissionStatus } from '../../types/preSignup';
import { initialFormValues, isFormSubmittable, validateAll, validateField, validateStep } from '../../utils/preSignupValidation';
import { SelectSheet } from './SelectSheet';
import { FAQItem } from './FAQItem';

type SheetName = 'nationality' | 'language' | 'destination' | null;

type FormFieldProps = {
  label: string;
  required?: boolean;
  value: string;
  placeholder?: string;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'words';
  editable?: boolean;
  onPress?: () => void;
  helperText?: string;
};

function getOptionLabel(options: SelectOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? '';
}

function FormField({
  label,
  required,
  value,
  placeholder,
  onChangeText,
  onBlur,
  error,
  keyboardType,
  autoCapitalize = 'words',
  editable = true,
  onPress,
  helperText,
}: FormFieldProps) {
  const sharedStyle = {
    borderWidth: 1,
    borderColor: error ? '#dc2626' : '#cbd5e1',
    backgroundColor: editable ? '#ffffff' : '#f8fafc',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 15,
    color: '#0f172a',
  } as const;

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontSize: 14, fontWeight: '700', color: '#0f172a' }}>
        {label}
        {required ? <Text style={{ color: '#dc2626' }}> *</Text> : null}
      </Text>
      {onPress ? (
        <Pressable onPress={onPress} style={sharedStyle}>
          <Text style={{ color: value ? '#0f172a' : '#94a3b8', fontSize: 15 }}>
            {value || placeholder}
          </Text>
        </Pressable>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          style={sharedStyle}
        />
      )}
      {error ? <Text style={{ color: '#dc2626', fontSize: 13 }}>{error}</Text> : null}
      {!error && helperText ? <Text style={{ color: '#64748b', fontSize: 13 }}>{helperText}</Text> : null}
    </View>
  );
}

function CheckboxRow({
  label,
  checked,
  onPress,
  supportingText,
}: {
  label: string;
  checked: boolean;
  onPress: () => void;
  supportingText?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: checked ? '#14b8a6' : '#e2e8f0',
        backgroundColor: checked ? '#f0fdfa' : '#ffffff',
        borderRadius: 18,
        paddingHorizontal: 14,
        paddingVertical: 14,
      }}
    >
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 8,
          borderWidth: 1.5,
          borderColor: checked ? '#0f766e' : '#94a3b8',
          backgroundColor: checked ? '#0f766e' : '#ffffff',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 1,
        }}
      >
        {checked ? <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '700' }}>✓</Text> : null}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#0f172a', fontSize: 15, fontWeight: '700' }}>{label}</Text>
        {supportingText ? (
          <Text style={{ color: '#64748b', fontSize: 13, marginTop: 4, lineHeight: 18 }}>{supportingText}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

export default function PreSignupLandingScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 960;
  const isTablet = width >= 720;
  const scrollRef = useRef<ScrollView>(null);
  const [sectionOffsets, setSectionOffsets] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [sheet, setSheet] = useState<SheetName>(null);
  const [values, setValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [submissionError, setSubmissionError] = useState('');

  const remittanceUnsupported = values.remittanceCountry === 'unsupported';
  const canSubmit = isFormSubmittable(values);

  const selectedNationality = getOptionLabel(nationalityOptions, values.nationality);
  const selectedLanguage = getOptionLabel(languageOptions, values.preferredLanguage);
  const selectedDestination = getOptionLabel(remittanceDestinationOptions, values.remittanceCountry);

  const sheetProps = useMemo(() => {
    switch (sheet) {
      case 'nationality':
        return {
          title: 'Select nationality',
          subtitle: 'Choose the nationality you want us to use for onboarding guidance.',
          options: nationalityOptions,
          value: values.nationality,
          onSelect: (value: string) => {
            setValues((prev) => ({ ...prev, nationality: value }));
            setErrors((prev) => ({ ...prev, nationality: '' }));
            setSheet(null);
          },
        };
      case 'language':
        return {
          title: 'Preferred language',
          subtitle: 'We will prioritize this language for early guidance when available.',
          options: languageOptions,
          value: values.preferredLanguage,
          onSelect: (value: string) => {
            setValues((prev) => ({ ...prev, preferredLanguage: value }));
            setErrors((prev) => ({ ...prev, preferredLanguage: '' }));
            setSheet(null);
          },
        };
      case 'destination':
        return {
          title: 'Remittance destination',
          subtitle: 'Select a supported destination, or choose the update option if you do not see your country yet.',
          options: remittanceDestinationOptions,
          value: values.remittanceCountry,
          onSelect: (value: string) => {
            setValues((prev) => ({ ...prev, remittanceCountry: value }));
            setErrors((prev) => ({ ...prev, remittanceCountry: '' }));
            setSheet(null);
          },
        };
      default:
        return null;
    }
  }, [sheet, values.nationality, values.preferredLanguage, values.remittanceCountry]);

  const updateField = <K extends keyof FormValues>(field: K, nextValue: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, { ...values, [field]: nextValue }) }));
    }
  };

  const toggleService = (service: ServiceOption) => {
    const nextServices = values.services.includes(service)
      ? values.services.filter((item) => item !== service)
      : [...values.services, service];

    const nextValues = {
      ...values,
      services: nextServices,
      remittanceCountry:
        service === 'remittance' || nextServices.includes('remittance') ? values.remittanceCountry : '',
    };

    setValues(nextValues);
    setErrors((prev) => ({
      ...prev,
      services: validateField('services', nextValues),
      remittanceCountry: validateField('remittanceCountry', nextValues),
    }));
  };

  const handleNextStep = () => {
    const stepErrors = validateStep(values, currentStep);
    setErrors((prev) => ({ ...prev, ...stepErrors }));
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep((prev) => Math.min(prev + 1, 2));
    }
  };

  const handleSubmit = async () => {
    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setCurrentStep(2);
      return;
    }

    setStatus('loading');
    setSubmissionError('');
    await new Promise<void>((resolve) => setTimeout(resolve, 1400));

    if (values.email.toLowerCase().includes('fail')) {
      setStatus('error');
      setSubmissionError('We could not complete your request right now. Please try again in a moment.');
      return;
    }

    setStatus('success');
  };

  const scrollToSection = (key: string) => {
    const y = sectionOffsets[key] ?? 0;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - 20), animated: true });
  };

  const containerWidth = isDesktop ? 1120 : 960;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        ref={scrollRef}
        style={styles.safeArea}
        contentContainerStyle={{ paddingBottom: width < 720 ? 120 : 56 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', paddingHorizontal: 16, paddingTop: 10 }}>
          <View style={{ width: '100%', maxWidth: containerWidth }}>
            <View style={styles.navbar}>
              <Text style={styles.logo}>Korea Connect Pay</Text>
              <View style={styles.navPills}>
                {['Why us', 'Countries', 'How it works', 'FAQ'].map((item) => {
                  const map: Record<string, string> = {
                    'Why us': 'benefits',
                    Countries: 'countries',
                    'How it works': 'steps',
                    FAQ: 'faq',
                  };
                  return (
                    <Pressable key={item} onPress={() => scrollToSection(map[item])} style={styles.navPill}>
                      <Text style={styles.navPillText}>{item}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={[styles.hero, isDesktop && styles.heroDesktop]}>
              <View style={{ flex: 1, gap: 18 }}>
                <View style={styles.eyebrowPill}>
                  <Text style={styles.eyebrowText}>Foreign-friendly fintech onboarding in Korea</Text>
                </View>
                <Text style={styles.heroTitle}>
                  Pre-sign up before you arrive and get a clearer start in Korea.
                </Text>
                <Text style={styles.heroSubtitle}>
                  A simple mobile-first flow for foreign prospects who want help with onboarding prep, account opening guidance, and remittance-related services.
                </Text>
                <View style={{ flexDirection: isTablet ? 'row' : 'column', gap: 12 }}>
                  <AppButton label="Pre-sign up now" onPress={() => scrollToSection('form')} fullWidth={!isTablet} />
                  <AppButton
                    label="Learn more"
                    variant="secondary"
                    onPress={() => scrollToSection('benefits')}
                    fullWidth={!isTablet}
                  />
                </View>
                <View style={styles.trustRow}>
                  {trustBadges.map((badge) => (
                    <View key={badge} style={styles.badgeItem}>
                      <Text style={styles.badgeText}>{badge}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={[styles.heroVisual, isDesktop && { maxWidth: 420 }]}>
                <View style={styles.heroVisualTop}>
                  <Text style={styles.heroVisualKicker}>Your next steps</Text>
                  <Text style={styles.heroVisualTitle}>Fast pre-signup, calm guidance, confident onboarding.</Text>
                </View>
                <View style={{ gap: 12 }}>
                  {heroHighlights.map((item) => (
                    <View key={item.label} style={styles.highlightCard}>
                      <Text style={styles.highlightValue}>{item.value}</Text>
                      <Text style={styles.highlightLabel}>{item.label}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.visualFooterCard}>
                  <Text style={styles.visualFooterTitle}>Trusted first-step experience</Text>
                  <Text style={styles.visualFooterBody}>
                    Clear eligibility, simple language selection, and guided service interest capture in one mobile-optimized flow.
                  </Text>
                </View>
              </View>
            </View>

            <View onLayout={(event) => setSectionOffsets((prev) => ({ ...prev, benefits: event.nativeEvent.layout.y }))} style={styles.section}>
              <SectionHeader
                eyebrow="Why this service"
                title="A premium but simple first-touch experience for foreign prospects"
                description="Designed to reduce uncertainty before full onboarding starts, with clear information hierarchy, trust cues, and short mobile-friendly actions."
              />
              <View style={[styles.cardGrid, isDesktop && { flexDirection: 'row', flexWrap: 'wrap' }]}>
                {benefitCards.map((card) => (
                  <View key={card.title} style={[styles.infoCard, isDesktop && { width: '48.5%' }]}>
                    <View style={styles.infoCardIconWrap}>
                      <Text style={styles.infoCardIcon}>{card.icon}</Text>
                    </View>
                    <Text style={styles.infoCardTitle}>{card.title}</Text>
                    <Text style={styles.infoCardBody}>{card.description}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View onLayout={(event) => setSectionOffsets((prev) => ({ ...prev, countries: event.nativeEvent.layout.y }))} style={styles.section}>
              <SectionHeader
                eyebrow="Supported countries"
                title="Remittance destinations currently available"
                description="The remittance service is currently limited to the countries below. If your preferred destination is not listed, you can still pre-sign up and receive updates."
              />
              <View style={styles.countryCallout}>
                <Text style={styles.countryCalloutTitle}>Inclusive by design</Text>
                <Text style={styles.countryCalloutBody}>
                  Your nationality does not need to match your remittance destination. We keep destination availability clear while still welcoming broader pre-signups.
                </Text>
              </View>
              <View style={[styles.countryGrid, isDesktop && { flexDirection: 'row', flexWrap: 'wrap' }]}>
                {supportedCountries.map((country) => (
                  <View key={country.value} style={[styles.countryChip, isDesktop && { width: '23.5%' }]}>
                    <Text style={styles.countryChipText}>{country.label}</Text>
                    <Text style={styles.countryChipMeta}>Available</Text>
                  </View>
                ))}
              </View>
            </View>

            <View onLayout={(event) => setSectionOffsets((prev) => ({ ...prev, steps: event.nativeEvent.layout.y }))} style={styles.section}>
              <SectionHeader
                eyebrow="How it works"
                title="A short, guided onboarding path"
                description="Keep the first interaction light. We capture interest now, prepare the right checklist next, and guide the rest as onboarding becomes available."
              />
              <View style={{ gap: 14 }}>
                {onboardingSteps.map((step, index) => (
                  <View key={step.title} style={styles.stepCard}>
                    <View style={styles.stepIndex}>
                      <Text style={styles.stepIndexText}>{index + 1}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                      <Text style={styles.stepBody}>{step.description}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View onLayout={(event) => setSectionOffsets((prev) => ({ ...prev, form: event.nativeEvent.layout.y }))} style={styles.section}>
              <SectionHeader
                eyebrow="Pre-signup"
                title="Tell us what you need before full onboarding begins"
                description="This mobile-first form uses short steps to keep the experience clear and conversion-friendly. Required fields are highlighted and the form is ready for API integration."
              />

              <View style={[styles.formShell, isDesktop && styles.formShellDesktop]}>
                <View style={[styles.progressPanel, isDesktop && { width: 280 }]}>
                  <Text style={styles.progressPanelTitle}>Your progress</Text>
                  {['Basic details', 'Preferences', 'Review & consent'].map((label, index) => {
                    const active = index === currentStep;
                    const complete = index < currentStep || status === 'success';
                    return (
                      <View key={label} style={styles.progressItem}>
                        <View
                          style={[
                            styles.progressDot,
                            complete && { backgroundColor: '#0f766e' },
                            active && { borderColor: '#0f766e', borderWidth: 5 },
                          ]}
                        />
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.progressLabel, active && { color: '#0f172a' }]}>{label}</Text>
                          <Text style={styles.progressSubLabel}>Step {index + 1} of 3</Text>
                        </View>
                      </View>
                    );
                  })}
                  <View style={styles.trustNoticeCard}>
                    <Text style={styles.trustNoticeTitle}>Privacy and trust</Text>
                    <Text style={styles.trustNoticeBody}>
                      We only ask for enough information to prepare your next step and support future onboarding communications.
                    </Text>
                  </View>
                </View>

                <View style={{ flex: 1, gap: 18 }}>
                  {status === 'success' ? (
                    <View style={styles.successCard}>
                      <Text style={styles.successBadge}>Pre-signup completed</Text>
                      <Text style={styles.successTitle}>Thanks, {values.englishName || values.fullName}.</Text>
                      <Text style={styles.successBody}>
                        Your pre-signup has been recorded. A follow-up guide can now be tailored to your preferred language, arrival timing, and service interests.
                      </Text>
                      <View style={{ gap: 12, marginTop: 10 }}>
                        {[
                          ['Full name', values.fullName],
                          ['English name', values.englishName],
                          ['Email', values.email],
                          ['Mobile', values.mobile],
                          ['Nationality', selectedNationality],
                          ['Preferred language', selectedLanguage],
                          ['Expected arrival', values.arrivalDate],
                          [
                            'Service interests',
                            serviceOptions
                              .filter((option) => values.services.includes(option.value))
                              .map((option) => option.label)
                              .join(', '),
                          ],
                          ['Remittance destination', selectedDestination || 'Not selected'],
                        ].map(([label, value]) => (
                          <View key={label} style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>{label}</Text>
                            <Text style={styles.summaryValue}>{value}</Text>
                          </View>
                        ))}
                      </View>
                      <AppButton
                        label="Submit another response"
                        variant="secondary"
                        onPress={() => {
                          setValues(initialFormValues);
                          setErrors({});
                          setStatus('idle');
                          setCurrentStep(0);
                        }}
                        style={{ marginTop: 18 }}
                      />
                    </View>
                  ) : (
                    <View style={styles.formCard}>
                      <Text style={styles.formTitle}>Step {currentStep + 1} of 3</Text>
                      <Text style={styles.formSubtitle}>
                        {currentStep === 0 && 'Start with the basic details we need for your pre-signup.'}
                        {currentStep === 1 && 'Tell us your language, arrival timing, and service interests.'}
                        {currentStep === 2 && 'Confirm eligibility, remittance preference, and required consent.'}
                      </Text>

                      {currentStep === 0 ? (
                        <View style={styles.formGrid}>
                          <FormField
                            label="Full name"
                            required
                            value={values.fullName}
                            placeholder="e.g. Nguyen Thi Anh"
                            onChangeText={(value) => updateField('fullName', value)}
                            onBlur={() => setErrors((prev) => ({ ...prev, fullName: validateField('fullName', values) }))}
                            error={errors.fullName}
                          />
                          <FormField
                            label="English name"
                            required
                            value={values.englishName}
                            placeholder="e.g. Anna Nguyen"
                            onChangeText={(value) => updateField('englishName', value)}
                            onBlur={() => setErrors((prev) => ({ ...prev, englishName: validateField('englishName', values) }))}
                            error={errors.englishName}
                          />
                          <FormField
                            label="Email"
                            required
                            value={values.email}
                            placeholder="you@example.com"
                            onChangeText={(value) => updateField('email', value.trim())}
                            onBlur={() => setErrors((prev) => ({ ...prev, email: validateField('email', values) }))}
                            error={errors.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                          />
                          <FormField
                            label="Mobile number"
                            required
                            value={values.mobile}
                            placeholder="+82 10 1234 5678"
                            onChangeText={(value) => updateField('mobile', value)}
                            onBlur={() => setErrors((prev) => ({ ...prev, mobile: validateField('mobile', values) }))}
                            error={errors.mobile}
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                            helperText="Include country code if available."
                          />
                        </View>
                      ) : null}

                      {currentStep === 1 ? (
                        <View style={styles.formGrid}>
                          <FormField
                            label="Nationality"
                            required
                            value={selectedNationality}
                            placeholder="Select nationality"
                            onPress={() => setSheet('nationality')}
                            error={errors.nationality}
                          />
                          <FormField
                            label="Preferred language"
                            required
                            value={selectedLanguage}
                            placeholder="Select language"
                            onPress={() => setSheet('language')}
                            error={errors.preferredLanguage}
                          />
                          <FormField
                            label="Expected date of arrival in Korea"
                            required
                            value={values.arrivalDate}
                            placeholder="YYYY-MM-DD"
                            onChangeText={(value) => updateField('arrivalDate', value)}
                            onBlur={() => setErrors((prev) => ({ ...prev, arrivalDate: validateField('arrivalDate', values) }))}
                            error={errors.arrivalDate}
                            autoCapitalize="none"
                            helperText="Use your best estimate if your travel date is not final yet."
                          />
                          <View style={{ gap: 8 }}>
                            <Text style={{ fontSize: 14, fontWeight: '700', color: '#0f172a' }}>
                              Interested service options <Text style={{ color: '#dc2626' }}>*</Text>
                            </Text>
                            <View style={{ gap: 10 }}>
                              {serviceOptions.map((option) => (
                                <CheckboxRow
                                  key={option.value}
                                  label={option.label}
                                  checked={values.services.includes(option.value)}
                                  onPress={() => toggleService(option.value)}
                                  supportingText={
                                    option.value === 'remittance'
                                      ? 'Choose this if you want to receive guidance for supported destinations.'
                                      : undefined
                                  }
                                />
                              ))}
                            </View>
                            {errors.services ? <Text style={{ color: '#dc2626', fontSize: 13 }}>{errors.services}</Text> : null}
                          </View>
                        </View>
                      ) : null}

                      {currentStep === 2 ? (
                        <View style={styles.formGrid}>
                          <FormField
                            label="Supported remittance destination country"
                            required={values.services.includes('remittance')}
                            value={selectedDestination}
                            placeholder={values.services.includes('remittance') ? 'Select destination' : 'Optional unless remittance is selected'}
                            onPress={() => setSheet('destination')}
                            error={errors.remittanceCountry}
                            helperText="Only supported destinations are currently available for remittance service."
                          />

                          {remittanceUnsupported ? (
                            <View style={styles.warningCard}>
                              <Text style={styles.warningTitle}>That destination is not supported yet.</Text>
                              <Text style={styles.warningBody}>
                                You can still pre-sign up for future updates, account preparation, and mobile onboarding guidance. Remittance activation will require a supported destination later.
                              </Text>
                            </View>
                          ) : null}

                          <CheckboxRow
                            label="I agree to receive marketing updates and launch news."
                            checked={values.marketingConsent}
                            onPress={() => updateField('marketingConsent', !values.marketingConsent)}
                            supportingText="Optional. You can unsubscribe later."
                          />
                          <View style={{ gap: 8 }}>
                            <CheckboxRow
                              label="I agree to the privacy notice and terms for pre-signup communications."
                              checked={values.privacyConsent}
                              onPress={() => {
                                const nextValue = !values.privacyConsent;
                                updateField('privacyConsent', nextValue);
                              }}
                              supportingText="Required to save your pre-signup and contact preferences."
                            />
                            {errors.privacyConsent ? (
                              <Text style={{ color: '#dc2626', fontSize: 13 }}>{errors.privacyConsent}</Text>
                            ) : null}
                          </View>

                          {status === 'error' ? (
                            <View style={styles.errorCard}>
                              <Text style={styles.errorTitle}>Submission error</Text>
                              <Text style={styles.errorBody}>{submissionError}</Text>
                            </View>
                          ) : null}
                        </View>
                      ) : null}

                      <View style={styles.formFooter}>
                        {currentStep > 0 ? (
                          <AppButton label="Back" variant="ghost" onPress={() => setCurrentStep((prev) => prev - 1)} />
                        ) : (
                          <View />
                        )}
                        {currentStep < 2 ? (
                          <AppButton label="Continue" onPress={handleNextStep} />
                        ) : (
                          <AppButton label="Complete pre-signup" onPress={handleSubmit} disabled={!canSubmit} loading={status === 'loading'} />
                        )}
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View onLayout={(event) => setSectionOffsets((prev) => ({ ...prev, faq: event.nativeEvent.layout.y }))} style={styles.section}>
              <SectionHeader
                eyebrow="FAQ"
                title="Helpful answers before you start"
                description="Keep uncertainty low with concise, foreigner-friendly explanations about what pre-signup does and what comes next."
              />
              <View style={{ gap: 12 }}>
                {faqs.map((faq) => (
                  <FAQItem key={faq.question} item={faq} />
                ))}
              </View>
            </View>

            <View style={[styles.finalCta, isDesktop && styles.finalCtaDesktop]}>
              <View style={{ flex: 1, gap: 10 }}>
                <Text style={styles.finalCtaEyebrow}>Ready to begin?</Text>
                <Text style={styles.finalCtaTitle}>Start with a simple pre-signup and prepare for your next steps in Korea.</Text>
                <Text style={styles.finalCtaBody}>
                  Friendly, mobile-first, and designed to make future onboarding feel more manageable from day one.
                </Text>
              </View>
              <AppButton label="Start pre-signup" onPress={() => scrollToSection('form')} fullWidth={!isDesktop} />
            </View>
          </View>
        </View>
      </ScrollView>

      {width < 720 && status !== 'success' ? (
        <View style={styles.stickyCtaWrap}>
          <AppButton label="Pre-sign up now" onPress={() => scrollToSection('form')} fullWidth />
        </View>
      ) : null}

      {sheetProps ? (
        <SelectSheet
          visible={!!sheetProps}
          title={sheetProps.title}
          subtitle={sheetProps.subtitle}
          options={sheetProps.options}
          selectedValue={sheetProps.value}
          onSelect={sheetProps.onSelect}
          onClose={() => setSheet(null)}
          searchable={sheet !== 'language'}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  logo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  navPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 8,
    flexShrink: 1,
  },
  navPill: {
    borderRadius: 999,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  navPillText: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '600',
  },
  hero: {
    marginTop: 20,
    borderRadius: 32,
    backgroundColor: '#e6fffb',
    padding: 22,
    gap: 20,
    overflow: 'hidden',
  },
  heroDesktop: {
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 32,
  },
  eyebrowPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  eyebrowText: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '800',
  },
  heroTitle: {
    color: '#0f172a',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 560,
  },
  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badgeItem: {
    borderRadius: 999,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeText: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '600',
  },
  heroVisual: {
    borderRadius: 28,
    backgroundColor: '#0f172a',
    padding: 18,
    gap: 16,
  },
  heroVisualTop: {
    gap: 8,
  },
  heroVisualKicker: {
    color: '#5eead4',
    fontSize: 13,
    fontWeight: '700',
  },
  heroVisualTitle: {
    color: '#ffffff',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
  },
  highlightCard: {
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 14,
  },
  highlightValue: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },
  highlightLabel: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  visualFooterCard: {
    borderRadius: 22,
    backgroundColor: '#134e4a',
    padding: 16,
  },
  visualFooterTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  visualFooterBody: {
    color: '#ccfbf1',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  section: {
    marginTop: 28,
    gap: 18,
  },
  cardGrid: {
    gap: 14,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  infoCardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#ecfeff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCardIcon: {
    fontSize: 20,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  infoCardBody: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },
  countryCallout: {
    borderRadius: 24,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    padding: 18,
  },
  countryCalloutTitle: {
    color: '#1d4ed8',
    fontSize: 16,
    fontWeight: '800',
  },
  countryCalloutBody: {
    color: '#334155',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 6,
  },
  countryGrid: {
    gap: 12,
  },
  countryChip: {
    borderRadius: 22,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  countryChipText: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '700',
  },
  countryChipMeta: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 6,
  },
  stepCard: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  stepIndex: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: '#ccfbf1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndexText: {
    color: '#115e59',
    fontWeight: '800',
    fontSize: 16,
  },
  stepTitle: {
    color: '#0f172a',
    fontSize: 17,
    fontWeight: '800',
  },
  stepBody: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 6,
  },
  formShell: {
    gap: 16,
  },
  formShellDesktop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  progressPanel: {
    borderRadius: 28,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 20,
    gap: 14,
  },
  progressPanelTitle: {
    fontSize: 18,
    color: '#0f172a',
    fontWeight: '800',
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressDot: {
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: '#cbd5e1',
  },
  progressLabel: {
    color: '#64748b',
    fontSize: 15,
    fontWeight: '700',
  },
  progressSubLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  trustNoticeCard: {
    marginTop: 8,
    borderRadius: 22,
    backgroundColor: '#ecfeff',
    padding: 16,
  },
  trustNoticeTitle: {
    color: '#155e75',
    fontSize: 15,
    fontWeight: '800',
  },
  trustNoticeBody: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  formCard: {
    borderRadius: 28,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 20,
    gap: 18,
  },
  formTitle: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '800',
  },
  formSubtitle: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 22,
  },
  formGrid: {
    gap: 16,
  },
  formFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  warningCard: {
    borderRadius: 18,
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fdba74',
    padding: 16,
  },
  warningTitle: {
    color: '#9a3412',
    fontSize: 15,
    fontWeight: '800',
  },
  warningBody: {
    color: '#7c2d12',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  errorCard: {
    borderRadius: 18,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    padding: 16,
  },
  errorTitle: {
    color: '#b91c1c',
    fontSize: 15,
    fontWeight: '800',
  },
  errorBody: {
    color: '#7f1d1d',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  successCard: {
    borderRadius: 28,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#99f6e4',
    padding: 20,
  },
  successBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#ccfbf1',
    color: '#115e59',
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontSize: 12,
    fontWeight: '800',
    overflow: 'hidden',
  },
  successTitle: {
    color: '#0f172a',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    marginTop: 14,
  },
  successBody: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 8,
  },
  summaryRow: {
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  summaryLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  summaryValue: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  finalCta: {
    marginTop: 28,
    marginBottom: 24,
    borderRadius: 30,
    backgroundColor: '#0f172a',
    padding: 24,
    gap: 18,
  },
  finalCtaDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  finalCtaEyebrow: {
    color: '#5eead4',
    fontSize: 13,
    fontWeight: '800',
  },
  finalCtaTitle: {
    color: '#ffffff',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
  },
  finalCtaBody: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 22,
  },
  stickyCtaWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: Platform.select({ ios: 18, android: 14, default: 14 }),
    backgroundColor: 'rgba(248, 250, 252, 0.96)',
    padding: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
});
