import { useEffect, useRef } from 'react';
import { site } from '../config/site';
import './CTA.css';

export default function CTA() {
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

  return (
    <section className="cta-section" id="cta">
      <div className="cta-bg"></div>
      <div className="cta-grid-bg"></div>
      <div className="cta-content reveal" ref={addToRefs}>
        <div className="section-label" style={{justifyContent: 'center', marginBottom: '24px'}}>
          <div className="section-label-line"></div>
          <span className="section-label-text">// Start Today</span>
          <div className="section-label-line"></div>
        </div>
        <h2 className="cta-title">READY TO<br /><span className="red">LAUNCH?</span></h2>
        <p className="cta-desc">
          Deploy your first site in under 5 minutes.<br />
          No setup fees. No hidden charges. Cancel anytime.<br />
          Annual plans get 2 months FREE in year one.
        </p>
        <div className="cta-actions">
          <a href="#pricing" className="btn-primary">Choose a Plan</a>
          <a href={`mailto:${site.emails.hello}`} className="btn-secondary">Talk to Sales</a>
        </div>
      </div>
    </section>
  );
}
