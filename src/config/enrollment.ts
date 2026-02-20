/**
 * Enrollment Flow Configuration
 *
 * Toggle between direct Sutra redirect and email capture flow.
 *
 * To switch modes, change the `mode` field below:
 *   - 'direct'        → Users click a CTA and go straight to Sutra enrollment.
 *   - 'email-capture' → Re-enables the ConvertKit form flow (see ROLLBACK.md).
 */

export const enrollmentConfig = {
  // Set to 'direct' for simple Sutra redirect
  // Set to 'email-capture' to re-enable ConvertKit flow
  mode: 'direct' as 'direct' | 'email-capture',

  // Sutra course enrollment URL
  sutraEnrollmentUrl: 'https://your-course.sutra.co/enroll', // UPDATE THIS URL

  // ConvertKit settings (preserved for easy rollback)
  convertKit: {
    formId: 'YOUR_FORM_ID', // Preserve existing form ID
    apiKey: import.meta.env.CONVERTKIT_API_KEY,
  },
};

/**
 * Get the enrollment action based on current configuration.
 *
 * Returns a discriminated union so callers can handle both modes:
 *   - { type: 'link', href, target } for direct mode
 *   - { type: 'form', formId }       for email-capture mode
 */
export function getEnrollmentAction() {
  if (enrollmentConfig.mode === 'direct') {
    return {
      type: 'link' as const,
      href: enrollmentConfig.sutraEnrollmentUrl,
      target: '_blank',
    };
  } else {
    return {
      type: 'form' as const,
      formId: enrollmentConfig.convertKit.formId,
    };
  }
}
