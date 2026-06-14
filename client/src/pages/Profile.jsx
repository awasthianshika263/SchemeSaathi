import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalSearches: 0,
    totalSchemes: 0,
    topCategory: 'N/A'
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await fetch('https://schemesaathi-k0of.onrender.com/api/schemes/history')
      const data = await response.json()
      setHistory(data)

      // Calculate stats
      const totalSchemes = data.reduce((sum, item) => sum + item.schemesFound, 0)
      const allSchemes = data.flatMap(item => item.schemeNames)
      setStats({
        totalSearches: data.length,
        totalSchemes,
        topCategory: allSchemes.length > 0 ? 'Education' : 'N/A'
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) return null

  return (
    <div className="profile-page">
<nav className="navbar">
  <div className="nav-logo" onClick={() => navigate('/')} style={{cursor:'pointer'}}>
    SchemeSaathi
  </div>
  <div className="nav-buttons">
    <button className="nav-btn-outline" onClick={() => navigate('/')}>🏠 Home</button>
    <button className="nav-btn-solid red" onClick={handleLogout}>Logout</button>
  </div>
</nav>

      <div className="profile-container">

        {/* PROFILE HEADER */}
        <div className="profile-header-card">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p>📧 {user.email}</p>
            <p>📅 Member since {new Date().toLocaleDateString('en-IN', {month:'long', year:'numeric'})}</p>
          </div>
        </div>

        {/* STATS */}
        <div className="profile-stats">
          <div className="profile-stat-card">
            <div className="profile-stat-number">{stats.totalSearches}</div>
            <div className="profile-stat-label">Total Searches</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-number">{stats.totalSchemes}</div>
            <div className="profile-stat-label">Schemes Found</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-number">25</div>
            <div className="profile-stat-label">Schemes Available</div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="profile-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-card" onClick={() => navigate('/find')}>
              <span className="action-icon">🔍</span>
              <span>Check Eligibility</span>
            </button>
            <button className="action-card" onClick={() => navigate('/browse')}>
              <span className="action-icon">📋</span>
              <span>Browse Schemes</span>
            </button>
            <button className="action-card" onClick={() => navigate('/history')}>
              <span className="action-icon">🕐</span>
              <span>Search History</span>
            </button>
            <button className="action-card" onClick={handleLogout} style={{borderColor:'#c0392b'}}>
              <span className="action-icon">🚪</span>
              <span style={{color:'#c0392b'}}>Logout</span>
            </button>
          </div>
        </div>

        {/* RECENT SEARCHES */}
        <div className="profile-recent">
          <h2>Recent Searches</h2>

          {loading && <p style={{color:'#666', textAlign:'center', padding:'20px'}}>Loading...</p>}

          {!loading && history.length === 0 && (
            <div className="no-results">
              <p>No searches yet!</p>
              <button className="submit-btn" onClick={() => navigate('/find')}>
                Start Searching
              </button>
            </div>
          )}

          {history.slice(0, 5).map((item, index) => (
            <div key={index} className="scheme-card">
              <div className="scheme-header">
                <span className="scheme-name">
                  {item.gender === 'female' ? '👩' : '👨'} {item.occupation} — {item.state}
                </span>
                <span className="scheme-badge">{item.schemesFound} schemes</span>
              </div>
              <div style={{display:'flex', gap:'10px', flexWrap:'wrap', margin:'10px 0'}}>
                <span className="doc-tag">Age: {item.age}</span>
                <span className="doc-tag">Income: ₹{item.income?.toLocaleString()}</span>
                <span className="doc-tag">Category: {item.category}</span>
                <span className="doc-tag">{new Date(item.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
              {item.schemeNames.length > 0 && (
                <div className="docs-list">
                  {item.schemeNames.map((name, i) => (
                    <span key={i} className="doc-tag" style={{background:'#e8f5e9', color:'#2d7a2d'}}>
                      ✅ {name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Profile