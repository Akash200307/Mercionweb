import { useEffect, useRef } from 'react';
import './ProductHighlight.css';

export default function ProductHighlight() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 150);
        }
      });
    }, { threshold: 0.1 });

    revealRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = el => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const products = [
    {
      id: "vps",
      tag: "POPULAR",
      title: "High Performance Cloud",
      desc: "Blazing fast VPS & Shared hosting powered by OLS and NVMe SSDs. Ideal for apps, portals, and high-traffic websites.",
      price: "149",
      specs: [
        { label: "Storage", val: "NVMe SSD (Up to 100GB)" },
        { label: "Control Panel", val: "CyberPanel (OLS)" },
        { label: "IP Address", val: "Dedicated IP Available" },
        { label: "Bandwidth", val: "Unmetered" }
      ],
      link: "#pricing",
      btnText: "Configure Cloud VPS"
    },
    {
      id: "wordpress",
      tag: "MANAGED",
      title: "Optimized WP Hosting",
      desc: "Fully managed environments pre-configured with LiteSpeed Cache, daily backups, staging tools, and premium security.",
      price: "179",
      specs: [
        { label: "Caching", val: "LiteSpeed Enterprise Cache" },
        { label: "Migration", val: "Free Professional Migration" },
        { label: "Staging", val: "1-Click Staging Included" },
        { label: "Security", val: "Malware Shield & Firewalls" }
      ],
      link: "#pricing",
      btnText: "Deploy WordPress"
    },
    {
      id: "dedicated",
      tag: "ENTERPRISE",
      title: "Dedicated & AI Bare Metal",
      desc: "Raw computing power with dedicated CPU/GPU cores, custom NVMe configurations, private networking, and maximum isolation.",
      price: "Custom",
      specs: [
        { label: "Processor", val: "Intel Xeon / AMD EPYC Cores" },
        { label: "AI Workloads", val: "GPU Server Configurations" },
        { label: "SLA Guarantee", val: "99.99% Contractual Uptime" },
        { label: "Support", val: "24/7 Dedicated Account Manager" }
      ],
      link: "#contact",
      btnText: "Build Custom Server"
    }
  ];

  return (
    <section className="product-highlight" id="products">
      <div className="ph-glow-bg"></div>
      
      <div className="ph-header reveal" ref={addToRefs}>
        <div className="section-label">
          <div className="section-label-line"></div>
          <span className="section-label-text">// Server Infrastructure</span>
        </div>
        <h2 className="section-title">CHOOSE YOUR <span style={{color: 'var(--red)'}}>ENGINE.</span></h2>
        <p className="section-desc ph-subtitle">
          From developer-friendly cloud VPS to fully managed WordPress environments and high-performance bare metal.
        </p>
      </div>

      <div className="ph-grid">
        {products.map((product, idx) => (
          <div 
            key={product.id} 
            className={`ph-card reveal ${product.id}`} 
            ref={addToRefs}
          >
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
                {product.price === "Custom" ? (
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

            <a href={product.link} className={`ph-card-btn ${product.price === "Custom" ? 'enterprise-btn' : ''}`}>
              {product.btnText} <span className="arrow">→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
