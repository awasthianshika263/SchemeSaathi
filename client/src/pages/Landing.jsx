import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Landing() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  return (
    <div className="landing">
      <nav className="navbar">
        <div className="nav-logo" onClick={() => navigate('/')} style={{cursor:'pointer'}}>
          SchemeSaathi
        </div>
        <div className="nav-buttons">
          <button className="nav-btn-outline" onClick={() => navigate('/browse')}>
            📋 Browse
          </button>
          <button className="nav-btn-outline" onClick={() => navigate('/history')}>
            🕐 History
          </button>
          {user ? (
            <>
              <button className="nav-btn-outline" onClick={() => navigate('/profile')}>
                👤 {user.name.split(' ')[0]}
              </button>
              <button className="nav-btn-solid red" onClick={() => logout()}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="nav-btn-outline" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="nav-btn-solid" onClick={() => navigate('/signup')}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">India Government Schemes</div>
          <h1>Find Schemes You <span className="highlight">Deserve</span></h1>
          <p>Enter your details once — discover all central government schemes you're eligible for. From housing to scholarships, health to agriculture.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/find')}>
              🔍 Check My Eligibility
            </button>
            <button className="btn-secondary" onClick={() => navigate('/browse')}>
              📋 Browse All Schemes
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">25+</span>
              <span className="stat-label">Schemes Listed</span>
            </div>
            <div className="stat">
              <span className="stat-number">7</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free to Use</span>
            </div>
          </div>
        </div>

        {/* HERO CARD */}
        <div className="hero-image">
  <div className="hero-card-mock">
    <div className="mock-badge">Government of India</div>
    <div className="mock-header">
      <span>✅ Schemes Found For You</span>
      <span className="mock-count">4</span>
    </div>
    <div className="mock-item">
      <div className="mock-icon-wrap housing">🏠</div>
      <div>
        <div className="mock-name">PM Awas Yojana</div>
        <div className="mock-cat">₹1.20 lakh benefit</div>
      </div>
      <span className="mock-tag">Housing</span>
    </div>
    <div className="mock-item">
      <div className="mock-icon-wrap edu">📚</div>
      <div>
        <div className="mock-name">NSP Scholarship</div>
        <div className="mock-cat">₹9900/month</div>
      </div>
      <span className="mock-tag">Education</span>
    </div>
    <div className="mock-item">
      <div className="mock-icon-wrap health">🏥</div>
      <div>
        <div className="mock-name">Ayushman Bharat</div>
        <div className="mock-cat">₹5 lakh coverage</div>
      </div>
      <span className="mock-tag">Health</span>
    </div>
    <div className="mock-item">
      <div className="mock-icon-wrap agri">🌾</div>
      <div>
        <div className="mock-name">PM Kisan Yojana</div>
        <div className="mock-cat">₹6000/year</div>
      </div>
      <span className="mock-tag">Agriculture</span>
    </div>
    <button className="mock-btn" onClick={() => navigate('/find')}>
      Check Your Eligibility →
    </button>
  </div>
</div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Why Use SchemeSaathi?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Results</h3>
            <p>Get your eligible schemes in seconds — no paperwork, no waiting</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Powered</h3>
            <p>Smart AI analyzes your profile and gives personalized recommendations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Document Checklist</h3>
            <p>Know exactly which documents you need before applying</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>100% Free</h3>
            <p>Completely free to use — no registration, no hidden charges</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Find Your Schemes?</h2>
        <p>Takes less than 2 minutes. No login required.</p>
        <button className="btn-primary large" onClick={() => navigate('/find')}>
          Get Started Now →
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>SchemeSaathi — Data sourced from official Government of India portals.</p>
      </footer>
    </div>
  )
}

export default Landing