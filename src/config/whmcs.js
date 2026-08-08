/**
 * WHMCS billing portal config (Phase 1).
 * Set VITE_WHMCS_URL in .env — e.g. https://billing.mercion.in
 * Replace pid values after you create products in WHMCS.
 */

const WHMCS_BASE = (import.meta.env.VITE_WHMCS_URL || 'https://billing.mercion.in').replace(/\/$/, '');

/** WHMCS product IDs — update to match Setup → Products/Services */
export const WHMCS_PRODUCTS = {
  hosting: {
    starter: Number(import.meta.env.VITE_WHMCS_PID_STARTER) || 1,
    pro: Number(import.meta.env.VITE_WHMCS_PID_PRO) || 2,
    business: Number(import.meta.env.VITE_WHMCS_PID_BUSINESS) || 3,
  },
  wordpress: {
    starter: Number(import.meta.env.VITE_WHMCS_PID_WP_STARTER) || 4,
    pro: Number(import.meta.env.VITE_WHMCS_PID_WP_PRO) || 5,
    business: Number(import.meta.env.VITE_WHMCS_PID_WP_BUSINESS) || 6,
  },
};

export const whmcsUrls = {
  base: WHMCS_BASE,
  clientArea: `${WHMCS_BASE}/clientarea.php`,
  register: `${WHMCS_BASE}/register.php`,
  cart: `${WHMCS_BASE}/cart.php`,
  orderForm: `${WHMCS_BASE}/cart.php?a=view`,
};

/**
 * @param {number} pid - WHMCS product id
 * @param {'monthly' | 'annually'} billingCycle
 */
export function whmcsAddToCart(pid, billingCycle = 'monthly') {
  const cycle = billingCycle === 'annually' ? 'annually' : 'monthly';
  return `${WHMCS_BASE}/cart.php?a=add&pid=${pid}&billingcycle=${cycle}`;
}

export function whmcsProductUrl(tab, planKey, isAnnual) {
  const group = WHMCS_PRODUCTS[tab];
  if (!group || group[planKey] == null) return whmcsUrls.orderForm;
  return whmcsAddToCart(group[planKey], isAnnual ? 'annually' : 'monthly');
}
