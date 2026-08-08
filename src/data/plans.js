/**
 * Single source of truth for Phase 1 plan cards (business plan Rev 2).
 * WHMCS product keys map to src/config/whmcs.js
 */

export const hostingPlans = {
  starter: {
    name: 'Starter',
    monthly: 149,
    features: [
      '1 Website',
      '2 GB SSD Storage',
      'Unmetered Bandwidth',
      'Free SSL Certificate',
      'CyberPanel Access',
      'Bring Your Own Domain',
    ],
  },
  pro: {
    name: 'Pro',
    monthly: 299,
    featured: true,
    features: [
      '5 Websites',
      '5 GB SSD Storage',
      'Unmetered Bandwidth',
      'Free SSL Certificate',
      'CyberPanel Access',
      'Priority Support',
    ],
  },
  business: {
    name: 'Business',
    monthly: 549,
    features: [
      'Unlimited Websites',
      '10 GB SSD Storage',
      'Unmetered Bandwidth',
      'Free SSL Certificate',
      'Priority Support',
      'Staging-Friendly Setup',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    monthly: null,
    enterprise: true,
    features: [
      'Unlimited Everything',
      'Custom SSD Storage',
      'Dedicated Resources',
      '99.99% SLA Uptime',
      '24/7 Dedicated Support',
      'Managed Migrations',
    ],
  },
};

export const wpPlans = {
  starter: {
    name: 'WP Starter',
    monthly: 179,
    features: [
      '1 Website',
      '2 GB SSD Storage',
      '10 GB Bandwidth',
      'Free SSL (HTTPS)',
      '1-click WordPress Install',
      'LiteSpeed Cache',
      'Weekly Backup',
      'Email Support',
    ],
  },
  pro: {
    name: 'WP Pro',
    monthly: 379,
    featured: true,
    features: [
      '2–3 Websites',
      '5 GB SSD Storage',
      'Unlimited Bandwidth',
      'Free SSL',
      'WordPress Pre-installed',
      'Daily Backup + Restore',
      'Staging Environment',
      'Free Migration',
      'Priority + WhatsApp Support',
    ],
  },
  business: {
    name: 'WP Business',
    monthly: 679,
    features: [
      'Unlimited Websites',
      '15 GB SSD Storage',
      'Unlimited Bandwidth',
      'Free SSL',
      '1-click WordPress Install',
      'LiteSpeed Cache',
      'Daily Backup',
      'Free Website Migration',
      'Staging Environment',
      'Priority Support',
    ],
  },
  enterprise: {
    name: 'WP Enterprise',
    monthly: null,
    enterprise: true,
    features: [
      'Unlimited Websites',
      'Custom SSD Storage',
      'Managed WordPress',
      'Advanced Security Suite',
      'Hourly Backups',
      'Dedicated Support',
      'Custom Solutions',
    ],
  },
};

export function annualMonthly(price) {
  if (price == null) return null;
  return Math.round((price * 10) / 12);
}
