import { useEffect, useRef } from 'react';
import './Features.css';

export default function Features() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 100);
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

  const features = [
    {
      num: "01",
      icon: "⚡",
      title: "OpenLiteSpeed Fast",
      desc: "CyberPanel + OpenLiteSpeed with caching tuned for snappy WordPress and PHP sites."
    },
    {
      num: "02",
      icon: "🛡️",
      title: "Secure by Default",
      desc: "Free Let's Encrypt SSL, firewall-friendly panel defaults, and isolation per account."
    },
    {
      num: "03",
      icon: "🖥️",
      title: "CyberPanel Access",
      desc: "Manage sites, databases, email, and SSL from a modern panel — no cPanel tax."
    },
    {
      num: "04",
      icon: "💾",
      title: "Backups Included",
      desc: "Plan-based backups (weekly on entry WP, daily on higher tiers) so restore is ready when you need it."
    },
    {
      num: "05",
      icon: "🌐",
      title: "Bring Your Domain",
      desc: "Point DNS to Mercion at launch. Domain registration & transfer are launching soon."
    },
    {
      num: "06",
      icon: "💳",
      title: "INR + Razorpay",
      desc: "Pay in rupees through WHMCS. Transparent renewals — no forex shock on hosting."
    }
  ];

  return (
    <section className="features" id="features">
      <div className="features-header">
        <div ref={addToRefs} className="reveal">
          <div className="section-label">
            <div className="section-label-line"></div>
            <span className="section-label-text">// Everything You Need</span>
          </div>
          <h2 className="section-title">THE MERCION<br /><span style={{color: 'var(--red)'}}>ADVANTAGE</span></h2>
        </div>
        <div ref={addToRefs} className="reveal">
          <p className="section-desc">
            We don't nickel-and-dime you for essential features. Everything you need to run a fast, secure, and reliable website is included in every plan.
          </p>
        </div>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card reveal" ref={addToRefs}>
            <div className="feature-num">{feature.num}</div>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-desc">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
