import { whmcsUrls } from '../config/whmcs';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <a href="#" style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', textDecoration: 'none'}}>
            <img src="/mercionen.png" alt="Mercion Logo" style={{height: '48px', width: 'auto', borderRadius: '4px'}} />
            <span style={{fontFamily: 'var(--font-exo2)', fontSize: '28px', fontWeight: '700', letterSpacing: '2px', color: 'var(--white)', textTransform: 'uppercase', display: 'inline-block', lineHeight: '1'}}>MERCION</span>
          </a>
          <div className="footer-tagline">Built for Performance. Designed for Trust.</div>
          <p className="footer-desc">
            Enterprise cloud hosting built for Indian businesses. Fast, secure, automated, and priced for growth.
          </p>
        </div>
        <div>
          <div className="footer-col-title">Hosting</div>
          <ul className="footer-links">
            <li><a href="#pricing">High Performance Hosting</a></li>
            <li><a href="#pricing">WordPress Hosting</a></li>
            <li><a href="#pricing">Domains — Launching Soon</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Company</div>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href={whmcsUrls.clientArea} target="_blank" rel="noopener noreferrer">Client Area</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} MERCION. All rights reserved.</span>
        <div className="footer-status">
          <div className="status-dot"></div>
          All systems operational
        </div>
      </div>
    </footer>
  );
}
