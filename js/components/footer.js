class InkmeldFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        inkmeld-footer {
          display: block;
          background: #020202;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 4rem 2rem 2rem;
          font-family: 'Inter', sans-serif;
          margin-top: 4rem;
          position: relative;
          overflow: hidden;
        }
        
        .footer-glow {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          height: 100px;
          background: var(--neon-violet, #8a2be2);
          filter: blur(100px);
          opacity: 0.2;
          border-radius: 50%;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        .footer-logo {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          color: white;
          text-decoration: none;
        }
        .footer-logo span {
          color: var(--neon-cyan, #00f0ff);
        }
        .footer-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
        }
        .footer-links a {
          color: #888;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }
        .footer-links a:hover {
          color: #fff;
        }
        .footer-bottom {
          width: 100%;
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: #555;
          font-size: 0.85rem;
        }
      </style>
      
      <div class="footer-glow"></div>
      <div class="footer-content">
        <a href="/" class="footer-logo">InkMeld<span>.</span>AI</a>
        <div class="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/cookies">Cookie Policy</a>
          <a href="/support">Support</a>
          <a href="/delete-account">Delete Account</a>
        </div>
        <div class="footer-bottom">
          &copy; 2026 OakDev & AI AB. All rights reserved.
        </div>
      </div>
    `;
  }
}

customElements.define('inkmeld-footer', InkmeldFooter);
