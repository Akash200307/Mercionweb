import { useState, useEffect, useRef } from 'react';
import './Process.css';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [particles, setParticles] = useState([]);
  const stepsRef = useRef([]);

  const steps = [
    {
      number: '01',
      title: 'Choose Your Plan',
      desc: 'Select the perfect hosting plan for your needs. From starter to enterprise, we have options for every stage of growth.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'Checkout via WHMCS',
      desc: 'Pay securely in INR with Razorpay. Your order is confirmed in our WHMCS client portal — invoices and renewals stay in one place.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Point Your Domain',
      desc: 'Use a domain you already own (DNS A/CNAME). Domain registration & transfer are launching soon — temporary URLs work at go-live.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      number: '04',
      title: 'Launch Website',
      desc: 'Hosting auto-provisions on CyberPanel with SSL. Enjoy fast OpenLiteSpeed performance and 24/7 support.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [steps.length]);

  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 2 + 2,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="process" id="process">
      <div className="process-bg-text">FLOW</div>
      <div className="process-particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.speed * 2}s`
            }}
          />
        ))}
      </div>
      <div className="process-header">
        <div className="section-label">
          <div className="section-label-line"></div>
          <span className="section-label-text">// How It Works</span>
        </div>
        <h2 className="section-title">
          GET STARTED IN<br />
          <span style={{ color: 'var(--red)' }}>4 STEPS.</span>
        </h2>
        <p className="section-desc process-desc">
          Launch your website in minutes with our streamlined onboarding process.
          No technical expertise required.
        </p>
      </div>

      <div className="process-flow">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`process-step ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
            ref={el => stepsRef.current[index] = el}
          >
            <div className="process-step-number">{step.number}</div>
            <div className="process-step-icon">
              {step.icon}
              <div className="icon-ring"></div>
            </div>
            <h3 className="process-step-title">{step.title}</h3>
            <p className="process-step-desc">{step.desc}</p>
            {index < steps.length - 1 && (
              <div className="process-connector">
                <div className="connector-line"></div>
                <div className="connector-dot"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="process-indicators">
        {steps.map((_, index) => (
          <button
            key={index}
            className={`process-indicator ${index === activeStep ? 'active' : ''}`}
            onClick={() => setActiveStep(index)}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
