import { useEffect, useRef } from 'react';
import './Testimonials.css';

export default function Testimonials() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 100);
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

  // Phase 1: value promises (replace with real reviews after first clients)
  const highlights = [
    {
      initial: '₹',
      name: 'Transparent INR pricing',
      role: 'No renewal shock',
      text: 'Same advertised monthly rate at renewal. Annual billing gives two months free in year one — WHMCS invoices stay clear.',
    },
    {
      initial: '⚡',
      name: 'CyberPanel + OpenLiteSpeed',
      role: 'Built for speed',
      text: 'Modern panel, free SSL, and LiteSpeed caching on WordPress plans. Point your existing domain and go live without registrar lock-in.',
    },
    {
      initial: '🛠',
      name: 'Human support in IST',
      role: 'Under 2 hours target',
      text: 'Sales and technical help over email; clients also open tickets in the WHMCS portal. We’re building Mercion with early customers in mind.',
    },
  ];

  return (
    <section className="testimonials">
      <div className="section-label reveal" ref={addToRefs}>
        <div className="section-label-line"></div>
        <span className="section-label-text">// What You Get</span>
      </div>
      <h2 className="section-title reveal" ref={addToRefs}>
        BUILT FOR
        <br />
        EARLY CUSTOMERS
      </h2>

      <div className="test-grid">
        {highlights.map((item, index) => (
          <div key={index} className="test-card reveal" ref={addToRefs}>
            <div className="test-avatar">{item.initial}</div>
            <p className="test-text">&ldquo;{item.text}&rdquo;</p>
            <div className="test-author">
              <div className="test-name">{item.name}</div>
              <div className="test-role">{item.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
