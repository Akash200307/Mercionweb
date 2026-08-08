/** Brand & contact — Phase 1 launch */
export const site = {
  name: 'Mercion',
  domain: 'mercion.in',
  tagline: 'Built for Performance. Designed for Trust.',
  emails: {
    support: 'support@mercion.in',
    hello: 'hello@mercion.in',
    sales: 'sales@mercion.in',
  },
  /** Set VITE_SUPPORT_PHONE when ready, e.g. +9198XXXXXXXX */
  phone: import.meta.env.VITE_SUPPORT_PHONE || '',
  responseSla: 'Within 2 hours (business hours IST)',
  location: 'India',
};

export function mailtoContact({ name, email, company, subject, message }) {
  const subjectMap = {
    enterprise: 'Enterprise Plan Inquiry',
    sales: 'Sales & Pricing',
    support: 'Technical Support',
    migration: 'Website Migration',
    billing: 'Billing Question',
    other: 'General Inquiry',
  };
  const label = subjectMap[subject] || subject || 'Contact';
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n');

  return `mailto:${site.emails.hello}?subject=${encodeURIComponent(`[Mercion] ${label}`)}&body=${encodeURIComponent(body)}`;
}
