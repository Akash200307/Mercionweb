import { useState } from 'react';
import { site, mailtoContact } from '../config/site';
import { whmcsUrls } from '../config/whmcs';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = mailtoContact(formData);
    setSubmitted(true);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-bg-orb"></div>
      <div className="contact-bg-orb contact-bg-orb2"></div>

      <div className="contact-inner">
        <div className="contact-header">
          <div className="section-label">
            <div className="section-label-line"></div>
            <span className="section-label-text">// Get In Touch</span>
          </div>
          <h2 className="section-title">
            LET&apos;S BUILD SOMETHING <span style={{ color: 'var(--red)' }}>GREAT.</span>
          </h2>
          <p className="section-desc">
            Questions, enterprise plans, or migrations — we respond during business hours IST.
            Existing customers can also open a ticket in the client area.
          </p>
        </div>

        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-info-card">
              <div className="contact-info-icon">📧</div>
              <div>
                <div className="contact-info-label">Email Us</div>
                <a href={`mailto:${site.emails.hello}`} className="contact-info-value">
                  {site.emails.hello}
                </a>
              </div>
            </div>
            {site.phone ? (
              <div className="contact-info-card">
                <div className="contact-info-icon">📞</div>
                <div>
                  <div className="contact-info-label">Call / WhatsApp</div>
                  <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="contact-info-value">
                    {site.phone}
                  </a>
                </div>
              </div>
            ) : (
              <div className="contact-info-card">
                <div className="contact-info-icon">💬</div>
                <div>
                  <div className="contact-info-label">Client Area</div>
                  <a
                    href={whmcsUrls.clientArea}
                    className="contact-info-value"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open support ticket
                  </a>
                </div>
              </div>
            )}
            <div className="contact-info-card">
              <div className="contact-info-icon">🕐</div>
              <div>
                <div className="contact-info-label">Response Time</div>
                <div className="contact-info-value">{site.responseSla}</div>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">📍</div>
              <div>
                <div className="contact-info-label">Based In</div>
                <div className="contact-info-value">{site.location}</div>
              </div>
            </div>

            <div className="contact-status-panel">
              <div className="status-dot-live"></div>
              <span>Hosting stack: CyberPanel · OpenLiteSpeed · WHMCS billing</span>
            </div>
          </div>

          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success-icon">✓</div>
                <h3>Email draft opened</h3>
                <p>
                  If your mail app didn&apos;t open, write us at{' '}
                  <a href={`mailto:${site.emails.hello}`}>{site.emails.hello}</a>.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setSubmitted(false)}
                  style={{ marginTop: '24px' }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      id="contact-name"
                      className="form-input"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      id="contact-email"
                      className="form-input"
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-company">
                      Company / Organization
                    </label>
                    <input
                      id="contact-company"
                      className="form-input"
                      type="text"
                      name="company"
                      placeholder="Optional"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-subject">
                      Subject <span className="required">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      className="form-input form-select"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select a topic…
                      </option>
                      <option value="enterprise">Enterprise Plan Inquiry</option>
                      <option value="sales">Sales &amp; Pricing</option>
                      <option value="support">Technical Support</option>
                      <option value="migration">Website Migration</option>
                      <option value="billing">Billing Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">
                    Your Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    className="form-input form-textarea"
                    name="message"
                    placeholder="Tell us about your site, current host, and what you need..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary contact-submit">
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
