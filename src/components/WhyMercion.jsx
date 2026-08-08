import { useEffect, useRef } from 'react';
import './WhyMercion.css';

export default function WhyMercion() {
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

  const points = [
    {
      num: "01",
      title: "India-First Infrastructure",
      desc: "Servers optimized for Indian latency with Razorpay payments, INR pricing, and local support that understands your business."
    },
    {
      num: "02",
      title: "More Affordable Than the Rest",
      desc: "Our pricing starts at just ₹149/month with no predatory renewal hikes. Competitors charge 2–3x more on renewal. We don't."
    },
    {
      num: "03",
      title: "More Reliable — 99.9% SLA Backed",
      desc: "Our uptime guarantee is real and contractual. Redundant infrastructure, automated failover, and constant monitoring keep you live."
    },
    {
      num: "04",
      title: "More Secure by Default",
      desc: "DDoS protection, daily backups, free SSL, malware scanning, and firewall rules come standard — not as paid extras."
    },
    {
      num: "05",
      title: "Fully Automated Operations",
      desc: "From account creation to renewal reminders — every step is automated. You focus on your business, we handle the hosting."
    }
  ];

  return (
    <section className="why" id="why">
      <div className="section-label reveal" ref={addToRefs}>
        <div className="section-label-line"></div>
        <span className="section-label-text">// Why Choose Us</span>
      </div>
      <h2 className="section-title reveal" ref={addToRefs}>WHY<br /><span style={{color: 'var(--red)'}}>MERCION</span></h2>

      <div className="why-grid">
        <div className="why-visual reveal" ref={addToRefs}>
          <div className="why-box-main">
            <div className="uptime-display">
              <div className="uptime-num">99<span className="red">.9</span>%</div>
              <div className="uptime-label">Guaranteed Uptime</div>
            </div>
            <div className="why-stat-card card-1">
              <div className="why-stat-num">OLS</div>
              <div className="why-stat-label">OpenLiteSpeed Stack</div>
            </div>
            <div className="why-stat-card card-2">
              <div className="why-stat-num">&lt;2hr</div>
              <div className="why-stat-label">Avg Response Time</div>
            </div>
          </div>
        </div>

        <div className="why-points reveal" ref={addToRefs}>
          {points.map((point, i) => (
            <div key={i} className="why-point">
              <span className="why-point-num">{point.num}</span>
              <div>
                <div className="why-point-title">{point.title}</div>
                <p className="why-point-desc">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
