import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const categories = ['All', 'Education', 'Housing', 'Health', 'Agriculture', 'Finance', 'Business', 'Welfare']

function Browse() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)

  useState(() => {
    fetch('https://schemesaathi-k0of.onrender.com/api/schemes/all')
      .then(res => res.json())
      .then(data => {
        setSchemes(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = schemes.filter(scheme => {
    const matchCategory = selectedCategory === 'All' || scheme.category === selectedCategory
    const matchSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="browse-page">
      <nav className="navbar">
  <div className="nav-logo" onClick={() => navigate('/')} style={{cursor:'pointer'}}>
    SchemeSaathi
  </div>
  <div className="nav-buttons">
    <button className="nav-btn-outline" onClick={() => navigate('/')}>🏠 Home</button>
    <button className="nav-btn-solid" onClick={() => navigate('/find')}>Check Eligibility</button>
  </div>
</nav>

      {/* HEADER */}
      <div className="browse-header">
        <h1>Browse All Schemes</h1>
        <p>Explore all {schemes.length} government schemes available</p>

        {/* SEARCH */}
        <div className="search-bar">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search schemes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="browse-container">

        {/* CATEGORY FILTERS */}
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* RESULTS COUNT */}
        <p className="results-count">
          Showing <strong>{filtered.length}</strong> schemes
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` for "${searchQuery}"`}
        </p>

        {/* LOADING */}
        {loading && (
          <div style={{textAlign:'center', padding:'60px', color:'#666'}}>
            Loading schemes...
          </div>
        )}

        {/* SCHEME CARDS */}
        {filtered.map(scheme => (
          <div key={scheme.id} className="scheme-card">
            <div className="scheme-header">
              <span className="scheme-name">{scheme.name}</span>
              <span className="scheme-badge">{scheme.category}</span>
            </div>

            <p className="scheme-description">{scheme.description}</p>

            <div className="scheme-benefit">
              💰 Benefit: {scheme.benefit}
            </div>

            {/* EXPANDED DETAILS */}
            {expandedId === scheme.id && (
              <div className="scheme-details">
                <div className="docs-section">
                  <div className="docs-title">📄 Documents Required</div>
                  <div className="docs-list">
                    {scheme.documents.map((doc, i) => (
                      <span key={i} className="doc-tag">{doc}</span>
                    ))}
                  </div>
                </div>

                <div className="eligibility-section">
                  <div className="docs-title">✅ Eligibility</div>
                  <div className="docs-list">
                    <span className="doc-tag">Age: {scheme.eligibility.minAge} - {scheme.eligibility.maxAge} years</span>
                    <span className="doc-tag">Income: up to ₹{scheme.eligibility.maxIncome.toLocaleString()}</span>
                    <span className="doc-tag">Gender: {scheme.eligibility.gender}</span>
                    <span className="doc-tag">Categories: {scheme.eligibility.categories.join(', ')}</span>
                  </div>
                </div>

                <a href={scheme.applyLink} target="_blank" rel="noreferrer" className="apply-btn">
                  Apply Now →
                </a>
              </div>
            )}

            <button
              className="expand-btn"
              onClick={() => setExpandedId(expandedId === scheme.id ? null : scheme.id)}
            >
              {expandedId === scheme.id ? '▲ Show Less' : '▼ View Details'}
            </button>
          </div>
        ))}

        {/* NO RESULTS */}
        {!loading && filtered.length === 0 && (
          <div className="no-results">
            <p>😕 No schemes found for your search.</p>
            <button className="back-btn" onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}>
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Browse