function Results({ data }) {
  const { schemes, aiSummary } = data

  if (!schemes || schemes.length === 0) {
    return (
      <div className="no-results">
        <p>😕 No schemes found matching your details.</p>
        <p>Try changing your occupation or category.</p>
      </div>
    )
  }

  return (
    <div className="results-section">
      <h2>Your Eligible Schemes ({schemes.length} found)</h2>

      {/* AI Summary Box */}
      {aiSummary && (
        <div className="ai-summary">
          <div className="ai-title">🤖 AI Summary</div>
          <p>{aiSummary}</p>
        </div>
      )}

      {/* Scheme Cards */}
      {schemes.map(scheme => (
        <div key={scheme.id} className="scheme-card">

          <div className="scheme-header">
            <span className="scheme-name">{scheme.name}</span>
            <span className="scheme-badge">{scheme.category}</span>
          </div>

          <p className="scheme-description">{scheme.description}</p>

          <div className="scheme-benefit">
            💰 Benefit: {scheme.benefit}
          </div>

          <div className="docs-section">
            <div className="docs-title">📄 Documents Required</div>
            <div className="docs-list">
              {scheme.documents.map((doc, i) => (
                <span key={i} className="doc-tag">{doc}</span>
              ))}
            </div>
          </div>

          <a
            href={scheme.applyLink}
            target="_blank"
            rel="noreferrer"
            className="apply-btn"
          >
            Apply Now →
          </a>

        </div>
      ))}
    </div>
  )
}

export default Results