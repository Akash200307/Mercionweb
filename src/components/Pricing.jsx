import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { whmcsUrls } from '../config/whmcs';
import { hostingPlans, wpPlans, annualMonthly } from '../data/plans';
import { useCart } from '../context/CartContext';
import './Pricing.css';

function withDisplayMeta(plans) {
  return Object.fromEntries(
    Object.entries(plans).map(([key, plan]) => [
      key,
      {
        ...plan,
        annual: annualMonthly(plan.monthly),
        enterprise: Boolean(plan.enterprise),
      },
    ])
  );
}

function resolvePricingTab(location) {
  const params = new URLSearchParams(location.search);
  const fromQuery = params.get('tab');
  if (fromQuery === 'wordpress' || fromQuery === 'hosting') return fromQuery;

  const hash = location.hash || window.location.hash || '';
  if (hash.includes('wordpress')) return 'wordpress';
  if (hash.includes('hosting')) return 'hosting';

  const stored = sessionStorage.getItem('pricingTab');
  if (stored === 'wordpress' || stored === 'hosting') return stored;

  return null;
}

export default function Pricing() {
  const location = useLocation();
  const { selected, selectPlan } = useCart();
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeTab, setActiveTab] = useState('hosting');

  useEffect(() => {
    const applyTab = (tab) => {
      if (tab !== 'hosting' && tab !== 'wordpress') return;
      setActiveTab(tab);
      sessionStorage.setItem('pricingTab', tab);
    };

    const fromLoc = resolvePricingTab(location);
    if (fromLoc) applyTab(fromLoc);

    const onCustom = (e) => applyTab(e.detail);
    window.addEventListener('pricing-tab', onCustom);
    return () => window.removeEventListener('pricing-tab', onCustom);
  }, [location]);

  const currentPlans =
    activeTab === 'hosting' ? withDisplayMeta(hostingPlans) : withDisplayMeta(wpPlans);

  const formatPrice = (price) => price.toLocaleString('en-IN');

  const switchTab = (tab) => {
    setActiveTab(tab);
    sessionStorage.setItem('pricingTab', tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    url.hash = 'pricing';
    window.history.replaceState(null, '', `${url.pathname}?${url.searchParams.toString()}#pricing`);
  };

  const handleSelect = (key, plan) => {
    if (plan.enterprise) return;
    const chargeRupees = isAnnual ? plan.monthly * 10 : plan.monthly;
    selectPlan({
      tab: activeTab,
      key,
      name: plan.name,
      billingCycle: isAnnual ? 'annually' : 'monthly',
      unitPrice: isAnnual ? plan.annual : plan.monthly,
      chargeRupees,
      amountPaise: Math.round(chargeRupees * 100),
      featured: Boolean(plan.featured),
    });
  };

  return (
    <section className="pricing" id="pricing">
      <div className="pricing-bg-text">PRICING</div>
      <div className="pricing-header">
        <div className="section-label">
          <div className="section-label-line"></div>
          <span className="section-label-text">// Honest Pricing</span>
        </div>
        <h2 className="section-title">
          NO RENEWAL <span style={{ color: 'var(--red)' }}>SHOCKS.</span>
        </h2>
        <p className="pricing-flow-hint">
          Select a plan → Add to cart → Checkout with Razorpay
        </p>
      </div>

      <div className="domains-soon-banner" role="status">
        <div className="domains-soon-badge">Launching Soon</div>
        <div className="domains-soon-copy">
          <strong>Domain registration &amp; transfer</strong> — bring your own domain for launch.
          Registrar checkout arrives in a later release.
        </div>
      </div>

      <div className="pricing-tabs">
        <button
          type="button"
          className={`pricing-tab ${activeTab === 'hosting' ? 'active' : ''}`}
          onClick={() => switchTab('hosting')}
        >
          High Performance Hosting
        </button>
        <button
          type="button"
          className={`pricing-tab ${activeTab === 'wordpress' ? 'active' : ''}`}
          onClick={() => switchTab('wordpress')}
          id="pricing-wordpress"
        >
          WordPress Hosting
        </button>
      </div>

      <div className="billing-toggle">
        <span className={`toggle-label ${!isAnnual ? 'active' : ''}`}>Monthly</span>
        <div
          className={`toggle-switch ${isAnnual ? 'on' : ''}`}
          onClick={() => setIsAnnual(!isAnnual)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsAnnual(!isAnnual);
            }
          }}
          role="switch"
          aria-checked={isAnnual}
          tabIndex={0}
        >
          <div className="toggle-thumb"></div>
        </div>
        <span className={`toggle-label ${isAnnual ? 'active' : ''}`}>Annually</span>
        <span className="annual-badge">2 MONTHS FREE</span>
      </div>

      <div className="pricing-grid" key={activeTab}>
        {Object.entries(currentPlans).map(([key, plan]) => {
          const currentPrice = isAnnual ? plan.annual : plan.monthly;
          const saving = plan.monthly * 2;
          const isSelected =
            selected &&
            selected.tab === activeTab &&
            selected.key === key &&
            selected.billingCycle === (isAnnual ? 'annually' : 'monthly');

          return (
            <div
              key={`${activeTab}-${key}`}
              className={`plan-card ${plan.featured ? 'featured' : ''} ${plan.enterprise ? 'enterprise' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => !plan.enterprise && handleSelect(key, plan)}
              onKeyDown={(e) => {
                if (!plan.enterprise && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleSelect(key, plan);
                }
              }}
              role={plan.enterprise ? undefined : 'button'}
              tabIndex={plan.enterprise ? undefined : 0}
            >
              {plan.featured && (
                <div className="plan-pick-ribbon">
                  <div className="plan-pick-glow"></div>
                  <div className="plan-pick-text">
                    <span className="plan-pick-star">★</span>
                    MERCION PICK
                  </div>
                </div>
              )}
              <div className="plan-top-line"></div>
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price-wrap">
                {plan.enterprise ? (
                  <>
                    <div className="plan-enterprise-label">Custom Pricing</div>
                    <div className="plan-enterprise-sub">Tailored to your infrastructure needs.</div>
                  </>
                ) : (
                  <>
                    <div className="plan-original-price">
                      {isAnnual ? `₹${formatPrice(plan.monthly)}/mo normally` : '\u00A0'}
                    </div>
                    <div className="plan-price">
                      <span className="currency">₹</span>
                      <span className="amount">{formatPrice(currentPrice)}</span>
                    </div>
                    <div className="plan-period">{isAnnual ? '/ month, billed annually' : '/ month'}</div>
                    <div className="plan-savings" style={{ opacity: isAnnual ? 1 : 0 }}>
                      ✦ SAVE ₹{formatPrice(saving)} IN YEAR ONE
                    </div>
                  </>
                )}
              </div>
              <div className="plan-divider"></div>
              <ul className="plan-features">
                {plan.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
              {plan.enterprise ? (
                <a
                  href="#contact"
                  className="plan-cta plan-cta-enterprise"
                  onClick={(e) => e.stopPropagation()}
                >
                  Contact Us →
                </a>
              ) : (
                <button
                  type="button"
                  className={`plan-cta ${isSelected ? 'plan-cta-selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(key, plan);
                  }}
                >
                  {isSelected ? 'Selected ✓' : 'Select Plan'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <p className="pricing-whmcs-note">
        After selecting a plan, use the cart bar to add it and checkout.
        Client area:{' '}
        <a href={whmcsUrls.clientArea} target="_blank" rel="noopener noreferrer">
          manage hosting
        </a>
        .
      </p>

      {activeTab === 'hosting' && (
        <div className="ai-hosting-cta">
          <div className="ai-hosting-content">
            <h3 className="ai-hosting-title">AI Hosting Server</h3>
            <p className="ai-hosting-desc">
              Looking for AI-powered hosting solutions? Contact us for custom AI server configurations
              tailored to your machine learning and AI workloads.
            </p>
            <a href="#contact" className="ai-hosting-btn">
              Contact Us for AI Hosting →
            </a>
          </div>
        </div>
      )}

      <div className="referral-banner">
        <div className="referral-content">
          <div className="referral-icon">🎁</div>
          <div className="referral-text">
            <strong>REFER &amp; EARN:</strong> Get 1 month of hosting FREE for every friend you refer!
          </div>
        </div>
      </div>

      <div className="annual-note" style={{ display: isAnnual ? 'flex' : 'none' }}>
        <div className="annual-note-icon">💡</div>
        <div className="annual-note-text">
          <strong>SMART CHOICE:</strong> You&apos;re getting 12 months of hosting for the price of 10!
        </div>
      </div>
    </section>
  );
}
