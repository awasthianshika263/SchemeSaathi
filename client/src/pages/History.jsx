import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function History() {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://schemesaathi-k0of.onrender.com/api/schemes/history')
      .then(res => res.json())
      .then(data => {
        setHistory(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="results-page">
<nav className="navbar">
  <div className="nav-logo" onClick={() => navigate('/')} style={{cursor:'pointer'}}>
    SchemeSaathi
  </div>
  <div className="nav-buttons">
    <button className="nav-btn-outline" onClick={() => navigate('/')}>🏠 Home</button>
    <button className="nav-btn-solid" onClick={() => navigate('/find')}>New Search</button>
  </div>
</nav>

      <div className="results-container">
        <div className="results-header">
          <h1>Search History</h1>
          <p>Your last 10 searches</p>
        </div>

        {loading && <p style={{textAlign:'center', color:'#666'}}>Loading...</p>}

        {!loading && history.length === 0 && (
          <div className="no-results">
            <p>😕 No search history found.</p>
            <button className="submit-btn" onClick={() => navigate('/find')}>
              Start Searching
            </button>
          </div>
        )}

        {history.map((item, index) => (
          <div key={index} className="scheme-card">
            <div className="scheme-header">
              <span className="scheme-name">
                {item.gender === 'female' ? '👩' : '👨'} {item.occupation} — {item.state}
              </span>
              <span className="scheme-badge">{item.schemesFound} schemes found</span>
            </div>

            <div style={{display:'flex', gap:'12px', flexWrap:'wrap', margin:'12px 0'}}>
              <span className="doc-tag">Age: {item.age}</span>
              <span className="doc-tag">Income: ₹{item.income}</span>
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

        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

export default History