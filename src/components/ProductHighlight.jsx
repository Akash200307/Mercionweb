import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductHighlight.css';

function goToPricingTab(navigate, tab) {
  sessionStorage.setItem('pricingTab', tab);
  window.dispatchEvent(new CustomEvent('pricing-tab', { detail: tab }));
  navigate(`/?tab=${tab}#pricing`);
  requestAnimationFrame(() => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

export default function ProductHighlight() {
  const navigate = useNavigate();
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 150);
        }
      });
    }, { threshold: 0.1 });

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const products = [
    {
      id: 'shared',
      tag: 'SHARED',
      title: 'High Performance Hosting',
      desc: 'Shared hosting on CyberPanel + OpenLiteSpeed. Clear storage limits, unmetered bandwidth on most plans, honest renewals.',
      price: '149',
      specs: [
        { label: 'Storage', val: '2–10 GB SSD by plan' },
        { label: 'Control Panel', val: 'CyberPanel (OLS)' },
        { label: 'Sites', val: '1 → Unlimited' },
        { label: 'Bandwidth', val: 'Unmetered' },
      ],
      tab: 'hosting',
      btnText: 'View Shared Plans',
    },
    {
      id: 'wordpress',
      tag: 'MANAGED',
      title: 'WordPress Hosting',
      desc: 'WP-ready plans with LiteSpeed Cache, SSL, and staging/migration on Pro and Business tiers.',
      price: '179',
      specs: [
        { label: 'Caching', val: 'LiteSpeed Cache' },
        { label: 'Migration', val: 'Free on WP Pro+' },
        { label: 'Staging', val: 'WP Pro & Business' },
        { label: 'Backups', val: 'Weekly → Daily by tier' },
      ],
      tab: 'wordpress',
      btnText: 'View WP Plans',
    },
    {
      id: 'dedicated',
      tag: 'ENTERPRISE',
      title: 'Dedicated & AI Workloads',
      desc: 'Custom resources when shared plans aren’t enough — talk to us for dedicated or GPU-oriented setups.',
      price: 'Custom',
      specs: [
        { label: 'Processor', val: 'Dedicated vCPU / bare metal' },
        { label: 'AI Workloads', val: 'Custom GPU options' },
        { label: 'SLA', val: 'Contracted uptime' },
        { label: 'Support', val: 'Priority account help' },
      ],
      tab: null,
      link: '#contact',
      btnText: 'Talk to Sales',
    },
  ];

  return (
    <section className="product-highlight" id="products">
      <div className="ph-glow-bg"></div>

      <div className="ph-header reveal" ref={addToRefs}>
        <div className="section-label">
          <div className="section-label-line"></div>
          <span className="section-label-text">// Server Infrastructure</span>
        </div>
        <h2 className="section-title">
          CHOOSE YOUR <span style={{ color: 'var(--red)' }}>ENGINE.</span>
        </h2>
        <p className="section-desc ph-subtitle">
          From developer-friendly cloud VPS to fully managed WordPress environments and high-performance bare metal.
        </p>
      </div>

      <div className="ph-grid">
        {products.map((product) => (
          <div key={product.id} className={`ph-card reveal ${product.id}`} ref={addToRefs}>
            <div className="ph-card-glow"></div>
            <div className="ph-card-border"></div>

            <div className="ph-card-header">
              <span className="ph-tag">{product.tag}</span>
              <div className="ph-status-light">
                <span className="ph-dot"></span>
                <span>Active Node</span>
              </div>
            </div>

            <h3 className="ph-card-title">{product.title}</h3>
            <p className="ph-card-desc">{product.desc}</p>

            <div className="ph-specs-list">
              {product.specs.map((spec, sIdx) => (
                <div key={sIdx} className="ph-spec-item">
                  <span className="ph-spec-label">{spec.label}</span>
                  <span className="ph-spec-val">{spec.val}</span>
                </div>
              ))}
            </div>

            <div className="ph-price-section">
              <div className="ph-price-lbl">Starting At</div>
              <div className="ph-price-amt">
                {product.price === 'Custom' ? (
                  <span className="custom-price">Custom</span>
                ) : (
                  <>
                    <span className="currency">₹</span>
                    <span className="amount">{product.price}</span>
                    <span className="period">/mo</span>
                  </>
                )}
              </div>
            </div>

            {product.tab ? (
              <button
                type="button"
                className="ph-card-btn"
                onClick={() => goToPricingTab(navigate, product.tab)}
              >
                {product.btnText} <span className="arrow">→</span>
              </button>
            ) : (
              <a href={product.link} className="ph-card-btn enterprise-btn">
                {product.btnText} <span className="arrow">→</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
