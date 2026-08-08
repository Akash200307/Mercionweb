import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid"></div>
      <div className="hero-glow"></div>
      <div className="hero-glow2"></div>
      <div className="hero-line"></div>
      
      <div className="hero-content">
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-line"></div>
          <span className="hero-eyebrow-text">Next-Gen Cloud Hosting</span>
        </div>
        <h1 className="hero-title">
          BUILT FOR <span className="red">PERFORMANCE.</span><br />
          DESIGNED FOR <span className="outline">TRUST.</span>
        </h1>
        <h2 className="hero-sub">ENTERPRISE CLOUD FOR INDIAN BUSINESSES</h2>
        <p className="hero-desc">
          Experience lightning-fast speeds, uncompromised security, and true 99.9% uptime. 
          The most reliable hosting infrastructure, built natively for the Indian market.
        </p>
        <div className="hero-actions">
          <a href="#pricing" className="btn-primary">View Pricing</a>
          <a href="#features" className="btn-secondary">Explore Features</a>
        </div>
      </div>

      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-num">99.9%</div>
          <div className="hero-stat-label">Uptime Target</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">INR</div>
          <div className="hero-stat-label">Razorpay Billing</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">&lt;2hr</div>
          <div className="hero-stat-label">Support Response</div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span className="scroll-text">SCROLL TO DISCOVER</span>
      </div>
    </section>
  );
}
