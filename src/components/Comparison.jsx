import { useState } from 'react';
import './Comparison.css';

export default function Comparison() {
  const [activeTab, setActiveTab] = useState('hosting');

  return (
    <section className="comparison">
      <div className="comparison-bg-text">VS</div>
      <div className="comparison-header">
        <div className="section-label">
          <div className="section-label-line"></div>
          <span className="section-label-text">// The Reality Check</span>
        </div>
        <h2 className="section-title">WHY PAY MORE<br />FOR <span style={{color: 'var(--red)'}}>LESS?</span></h2>
        <p className="comparison-subtitle">
          See how we stack up against the "big names" in the Indian hosting market.
        </p>
      </div>

      <div className="comparison-tabs">
        <button
          className={`comparison-tab ${activeTab === 'hosting' ? 'active' : ''}`}
          onClick={() => setActiveTab('hosting')}
        >
          High Performance Hosting
        </button>
        <button
          className={`comparison-tab ${activeTab === 'wordpress' ? 'active' : ''}`}
          onClick={() => setActiveTab('wordpress')}
        >
          WordPress Hosting
        </button>
      </div>

      {activeTab === 'hosting' && (
        <div className="compare-table-wrap" key="hosting">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature / Metric</th>
                <th className="mercion-col">MERCION</th>
                <th>Hostinger (IN)</th>
                <th>GoDaddy (IN)</th>
                <th>Bluehost (IN)</th>
                <th>BigRock</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feature-col">Base Renewal Price</td>
                <td className="mercion-col" style={{color: 'var(--green)'}}>₹149/mo</td>
                <td><span className="cross">✘</span> ₹349+/mo</td>
                <td><span className="cross">✘</span> ₹499+/mo</td>
                <td><span className="cross">✘</span> ₹499+/mo</td>
                <td><span className="cross">✘</span> ₹399+/mo</td>
              </tr>
              <tr>
                <td className="feature-col">Performance Tech</td>
                <td className="mercion-col"><span className="check">✔</span> OLS + NVMe</td>
                <td><span className="partial">LiteSpeed</span></td>
                <td><span className="cross">✘</span> Apache + HDD</td>
                <td><span className="cross">✘</span> Apache</td>
                <td><span className="cross">✘</span> Apache</td>
              </tr>
              <tr>
                <td className="feature-col">Control Panel</td>
                <td className="mercion-col"><span className="check">✔</span> CyberPanel</td>
                <td><span className="partial">hPanel (Custom)</span></td>
                <td><span className="partial">cPanel</span></td>
                <td><span className="partial">cPanel</span></td>
                <td><span className="partial">cPanel</span></td>
              </tr>
              <tr>
                <td className="feature-col">Free SSL & Backups</td>
                <td className="mercion-col"><span className="check">✔</span> Included</td>
                <td><span className="check">✔</span> Included</td>
                <td><span className="cross">✘</span> Paid Extra</td>
                <td><span className="partial">1st Year Only</span></td>
                <td><span className="cross">✘</span> Paid Extra</td>
              </tr>
              <tr>
                <td className="feature-col">Support Quality</td>
                <td className="mercion-col"><span className="check">✔</span> Expert (Under 2hr)</td>
                <td><span className="check">✔</span></td>
                <td><span className="partial">Long wait times</span></td>
                <td><span className="partial">Chat only</span></td>
                <td><span className="partial">Ticket only</span></td>
              </tr>
              <tr>
                <td className="feature-col">INR Billing + Razorpay</td>
                <td className="mercion-col"><span className="check">✔</span> Native</td>
                <td><span className="partial">Limited</span></td>
                <td><span className="partial">Limited</span></td>
                <td><span className="cross">✘</span></td>
                <td><span className="check">✔</span></td>
              </tr>
              <tr>
                <td className="feature-col">Auto Scaling</td>
                <td className="mercion-col"><span className="check">✔</span> Premium</td>
                <td><span className="cross">✘</span></td>
                <td><span className="cross">✘</span></td>
                <td><span className="cross">✘</span></td>
                <td><span className="cross">✘</span></td>
              </tr>
              <tr className="highlight-row">
                <td className="feature-col">Annual Plan: 2 Months Free</td>
                <td className="mercion-col"><span className="check">✔</span> 1st Year</td>
                <td><span className="cross">✘</span></td>
                <td><span className="cross">✘</span></td>
                <td><span className="cross">✘</span></td>
                <td><span className="cross">✘</span></td>
              </tr>
              <tr>
                <td className="feature-col">Hidden Renewal Fees</td>
                <td className="mercion-col" style={{color: 'var(--green)'}}>None. Ever.</td>
                <td><span className="cross">✘</span> 2x renewal</td>
                <td><span className="cross">✘</span> 3x renewal</td>
                <td><span className="cross">✘</span> High renewal</td>
                <td><span className="cross">✘</span> Varies</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'wordpress' && (
        <div className="compare-table-wrap" key="wordpress">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature / Metric</th>
                <th className="mercion-col">MERCION WP</th>
                <th>Hostinger WP</th>
                <th>GoDaddy WP</th>
                <th>Bluehost WP</th>
                <th>BigRock WP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feature-col">Base Renewal Price</td>
                <td className="mercion-col" style={{color: 'var(--green)'}}>₹179/mo</td>
                <td><span className="cross">✘</span> ₹399+/mo</td>
                <td><span className="cross">✘</span> ₹599+/mo</td>
                <td><span className="cross">✘</span> ₹599+/mo</td>
                <td><span className="cross">✘</span> ₹449+/mo</td>
              </tr>
              <tr>
                <td className="feature-col">LiteSpeed Cache</td>
                <td className="mercion-col"><span className="check">✔</span> Built-in</td>
                <td><span className="check">✔</span></td>
                <td><span className="cross">✘</span></td>
                <td><span className="partial">Plugin Only</span></td>
                <td><span className="cross">✘</span></td>
              </tr>
              <tr>
                <td className="feature-col">1-Click WP Install</td>
                <td className="mercion-col"><span className="check">✔</span> Included</td>
                <td><span className="check">✔</span></td>
                <td><span className="check">✔</span></td>
                <td><span className="check">✔</span></td>
                <td><span className="check">✔</span></td>
              </tr>
              <tr>
                <td className="feature-col">Staging Environment</td>
                <td className="mercion-col"><span className="check">✔</span> Business+</td>
                <td><span className="cross">✘</span></td>
                <td><span className="cross">✘</span></td>
                <td><span className="partial">Pro Only</span></td>
                <td><span className="cross">✘</span></td>
              </tr>
              <tr>
                <td className="feature-col">Free Migration</td>
                <td className="mercion-col"><span className="check">✔</span> Business+</td>
                <td><span className="partial">Paid</span></td>
                <td><span className="partial">Paid</span></td>
                <td><span className="partial">1st Year Only</span></td>
                <td><span className="cross">✘</span></td>
              </tr>
              <tr>
                <td className="feature-col">Malware Protection</td>
                <td className="mercion-col"><span className="check">✔</span> Pro Plan</td>
                <td><span className="partial">Paid Add-on</span></td>
                <td><span className="partial">Paid Add-on</span></td>
                <td><span className="partial">Paid Add-on</span></td>
                <td><span className="cross">✘</span></td>
              </tr>
              <tr>
                <td className="feature-col">Daily Backups</td>
                <td className="mercion-col"><span className="check">✔</span> All Plans</td>
                <td><span className="partial">Weekly Only</span></td>
                <td><span className="partial">Weekly Only</span></td>
                <td><span className="partial">Daily (Pro+)</span></td>
                <td><span className="cross">✘</span></td>
              </tr>
              <tr className="highlight-row">
                <td className="feature-col">Annual Plan: 2 Months Free</td>
                <td className="mercion-col"><span className="check">✔</span> 1st Year</td>
                <td><span className="cross">✘</span></td>
                <td><span className="cross">✘</span></td>
                <td><span className="cross">✘</span></td>
                <td><span className="cross">✘</span></td>
              </tr>
              <tr>
                <td className="feature-col">Hidden Renewal Fees</td>
                <td className="mercion-col" style={{color: 'var(--green)'}}>None. Ever.</td>
                <td><span className="cross">✘</span> 2x renewal</td>
                <td><span className="cross">✘</span> 3x renewal</td>
                <td><span className="cross">✘</span> High renewal</td>
                <td><span className="cross">✘</span> Varies</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="compare-banner">
        <div className="compare-banner-text">
          <strong>Less Cost. More Reliable. More Secure.</strong>
          MERCION offers the most value per rupee with enterprise features at startup-friendly pricing — and zero hidden charges.
        </div>
        <div className="compare-pillars">
          <div className="compare-pillar"><div className="compare-pillar-dot"></div><span className="compare-pillar-text">Most Affordable</span></div>
          <div className="compare-pillar"><div className="compare-pillar-dot"></div><span className="compare-pillar-text">99.9% Uptime</span></div>
          <div className="compare-pillar"><div className="compare-pillar-dot"></div><span className="compare-pillar-text">Enterprise Security</span></div>
          <div className="compare-pillar"><div className="compare-pillar-dot"></div><span className="compare-pillar-text">Zero Hidden Fees</span></div>
        </div>
      </div>
    </section>
  );
}
