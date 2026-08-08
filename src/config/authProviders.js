/** Authentication providers available / planned for Mercion */

export const AUTH_PROVIDERS = [
  {
    id: 'email',
    name: 'Email & Password',
    status: 'active',
    description: 'Sign up with email. Sessions are issued by the Mercion API.',
  },
  {
    id: 'google',
    name: 'Google',
    status: 'coming_soon',
    description: 'OAuth 2.0 via Google — enable with GOOGLE_CLIENT_ID when ready.',
  },
  {
    id: 'github',
    name: 'GitHub',
    status: 'coming_soon',
    description: 'OAuth via GitHub — enable with GITHUB_CLIENT_ID when ready.',
  },
  {
    id: 'whmcs',
    name: 'WHMCS Client Area',
    status: 'planned',
    description: 'SSO into billing portal after WHMCS is live.',
  },
];

export const activeProviders = () => AUTH_PROVIDERS.filter((p) => p.status === 'active');
