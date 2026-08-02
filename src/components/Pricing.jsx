import { useState } from 'react';
import './Pricing.css';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeTab, setActiveTab] = useState('hosting');

  const hostingPlans = {
    basic: { name: "Starter", monthly: 149, annual: Math.round(149 * 10 / 12), features: ["1 Website", "2 GB NVMe Storage", "Unmetered Bandwidth", "Free SSL Certificate", "Daily Backups"], enterprise: false },
    standard: { name: "Pro", monthly: 299, annual: Math.round(299 * 10 / 12), features: ["5 Websites", "5 GB NVMe Storage", "Unmetered Bandwidth", "Free SSL Certificate", "Daily Backups", "Priority Support"], featured: true, enterprise: false },
    premium: { name: "Business", monthly: 549, annual: Math.round(549 * 10 / 12), features: ["Unlimited Websites", "10 GB NVMe Storage", "Unmetered Bandwidth", "Free SSL Certificate", "Daily Backups", "Priority Support", "Dedicated IP"], enterprise: false },
    enterprise: { name: "Enterprise", monthly: null, annual: null, features: ["Unlimited Everything", "Custom NVMe Storage", "Dedicated Servers", "99.99% SLA Uptime", "24/7 Dedicated Support", "Custom Security Rules", "Managed Migrations", "Private Cloud Option"], enterprise: true }
  };

  const wpPlans = {
    starter: { name: "WP Starter", monthly: 179, annual: Math.round(179 * 10 / 12), features: ["1 Website", "2 GB SSD Storage", "10 GB Bandwidth", "Free SSL (HTTPS)", "1-click WordPress Install", "LiteSpeed Cache (fast loading)", "Basic Security (firewall)", "Weekly Backup", "Email Support"], enterprise: false },
    pro: { name: "WP Pro", monthly: 379, annual: Math.round(379 * 10 / 12), features: ["2–3 Websites", "5 GB SSD Storage", "Unlimited Bandwidth", "Free SSL", "WordPress Pre-installed", "Advanced Speed Optimization", "Malware Protection", "Daily Backup + Restore", "Staging Environment", "Free Migration", "Priority + WhatsApp Support"], featured: true, enterprise: false },
    business: { name: "WP Business", monthly: 679, annual: Math.round(679 * 10 / 12), features: ["Unlimited Websites", "15 GB SSD Storage", "Unlimited Bandwidth", "Free SSL", "1-click WordPress Install", "LiteSpeed Cache (high speed)", "Advanced Security", "Daily Backup", "Free Website Migration", "Staging (test before live)", "Priority Support"], enterprise: false },
    enterprise: { name: "WP Enterprise", monthly: null, annual: null, features: ["Unlimited Websites", "Custom SSD Storage", "Unlimited Bandwidth", "Free SSL", "Managed WordPress", "Advanced Security Suite", "Hourly Backups", "Dedicated Support", "Custom Solutions", "Private Cloud Option"], enterprise: true }
  };

  const formatPrice = (price) => price.toLocaleString('en-IN');

  const currentPlans = activeTab === 'hosting' ? hostingPlans : wpPlans;

  return (
    <section className="pricing" id="pricing">
      <div className="pricing-bg-text">PRICING</div>
      <div className="pricing-header">
        <div className="section-label">
          <div className="section-label-line"></div>
          <span className="section-label-text">// Honest Pricing</span>
        </div>
        <h2 className="section-title">NO RENEWAL <span style={{ color: 'var(--red)' }}>SHOCKS.</span></h2>
      </div>

      <div className="pricing-tabs">
        <button
          className={`pricing-tab ${activeTab === 'hosting' ? 'active' : ''}`}
          onClick={() => setActiveTab('hosting')}
        >
          High Performance Hosting
        </button>
        <button
          className={`pricing-tab ${activeTab === 'wordpress' ? 'active' : ''}`}
          onClick={() => setActiveTab('wordpress')}
        >
          WordPress Hosting
        </button>
      </div>

      <div className="billing-toggle">
        <span className={`toggle-label ${!isAnnual ? 'active' : ''}`}>Monthly</span>
        <div className={`toggle-switch ${isAnnual ? 'on' : ''}`} onClick={() => setIsAnnual(!isAnnual)}>
          <div className="toggle-thumb"></div>
        </div>
        <span className={`toggle-label ${isAnnual ? 'active' : ''}`}>Annually</span>
        <span className="annual-badge">2 MONTHS FREE</span>
      </div>

      <div className="pricing-grid" key={activeTab}>
        {Object.entries(currentPlans).map(([key, plan], index) => {
          const currentPrice = isAnnual ? plan.annual : plan.monthly;
          const saving = plan.monthly * 2;

          return (
            <div key={`${activeTab}-${key}`} className={`plan-card ${plan.featured ? 'featured' : ''} ${plan.enterprise ? 'enterprise' : ''}`}>
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
                <a href="#contact" className="plan-cta plan-cta-enterprise">Contact Us →</a>
              ) : (
                <a href="#contact" className="plan-cta">{plan.featured ? 'Get Started →' : 'Select Plan'}</a>
              )}
            </div>
          );
        })}
      </div>

      {activeTab === 'hosting' && (
        <div className="ai-hosting-cta">
          <div className="ai-hosting-content">
            <h3 className="ai-hosting-title">🤖 AI Hosting Server</h3>
            <p className="ai-hosting-desc">Looking for AI-powered hosting solutions? Contact us for custom AI server configurations tailored to your machine learning and AI workloads.</p>
            <a href="#contact" className="ai-hosting-btn">Contact Us for AI Hosting →</a>
          </div>
        </div>
      )}

      <div className="referral-banner">
        <div className="referral-content">
          <div className="referral-icon">🎁</div>
          <div className="referral-text">
            <strong>REFER & EARN:</strong> Get 1 month of hosting FREE for every friend you refer!
          </div>
        </div>
      </div>

      <div className="annual-note" style={{ display: isAnnual ? 'flex' : 'none' }}>
        <div className="annual-note-icon">💡</div>
        <div className="annual-note-text">
          <strong>SMART CHOICE:</strong> You're getting 12 months of hosting for the price of 10!
        </div>
      </div>
    </section>
  );
}
