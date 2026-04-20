class InkmeldNavbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        inkmeld-navbar {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
        }
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: rgba(5, 5, 5, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: background 0.3s ease;
        }
        .logo {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.8rem;
          color: white;
          text-decoration: none;
          letter-spacing: -1px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .logo span {
          background: linear-gradient(90deg, #00f0ff, #8a2be2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .nav-links a {
          color: #f0f0f0;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 1rem;
          text-decoration: none;
          transition: color 0.3s;
        }
        .nav-links a:hover {
          color: #00f0ff;
        }
        .nav-cta {
          /* Inherits global btn styling if needed, but we inline core styles to keep shadow DOM / encapsulation optional. 
             Since we aren't using shadow DOM here (for easier global CSS sharing), global classes work! */
        }
        
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      </style>
      <nav class="navbar-container">
        <a href="/" class="logo">InkMeld<span>.</span>AI</a>
        <div class="nav-links">
          <a href="/#features">Features</a>
          <a href="/support">Support</a>
        </div>
      </nav>
    `;
  }
}

customElements.define('inkmeld-navbar', InkmeldNavbar);
