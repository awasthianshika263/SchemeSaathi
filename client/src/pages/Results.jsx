import { useLocation, useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state?.results

  if (!data) {
    return (
      <div style={{textAlign:'center', padding:'60px'}}>
        <p>No data found. Please search again.</p>
        <button onClick={() => navigate('/find')} style={{marginTop:'20px', padding:'12px 24px', background:'#2d7a2d', color:'white', border:'none', borderRadius:'8px', cursor:'pointer'}}>
          Go Back
        </button>
      </div>
    )
  }

  const { schemes, aiSummary } = data

  const downloadPDF = () => {
    const doc = new jsPDF()

    // Header
    doc.setFillColor(26, 61, 26)
    doc.rect(0, 0, 210, 30, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('SchemeSaathi', 14, 15)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Your Eligible Government Schemes', 14, 23)

    // Date
    doc.setTextColor(200, 200, 200)
    doc.setFontSize(9)
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 150, 23)

    // AI Summary
    if (aiSummary) {
      doc.setTextColor(44, 122, 44)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('AI Summary', 14, 42)
      doc.setTextColor(80, 80, 80)
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      const summaryLines = doc.splitTextToSize(aiSummary, 180)
      doc.text(summaryLines, 14, 50)
    }

    let yPos = aiSummary ? 50 + (doc.splitTextToSize(aiSummary, 180).length * 5) + 10 : 42

    // Schemes
    doc.setTextColor(26, 61, 26)
    doc.setFontSize(13)
    doc.setFont('helvetica', 'bold')
    doc.text(`Eligible Schemes (${schemes.length} found)`, 14, yPos)
    yPos += 8

    schemes.forEach((scheme, index) => {
      if (yPos > 250) {
        doc.addPage()
        yPos = 20
      }

      // Scheme card background
      doc.setFillColor(245, 250, 245)
      doc.roundedRect(12, yPos, 186, 8, 2, 2, 'F')

      // Scheme name
      doc.setTextColor(26, 61, 26)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(`${index + 1}. ${scheme.name}`, 16, yPos + 5.5)

      // Category badge
      doc.setFillColor(44, 122, 44)
      doc.roundedRect(160, yPos + 1, 30, 6, 2, 2, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(7)
      doc.text(scheme.category, 162, yPos + 5.5)

      yPos += 12

      // Description
      doc.setTextColor(80, 80, 80)
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      const descLines = doc.splitTextToSize(scheme.description, 180)
      doc.text(descLines, 16, yPos)
      yPos += descLines.length * 4 + 3

      // Benefit
      doc.setFillColor(255, 248, 225)
      doc.roundedRect(14, yPos, 182, 7, 2, 2, 'F')
      doc.setTextColor(200, 100, 0)
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.text(`Benefit: ${scheme.benefit}`, 16, yPos + 4.5)
      yPos += 11

      // Documents
      doc.setTextColor(60, 60, 60)
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.text('Documents Required:', 16, yPos)
      yPos += 5
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(80, 80, 80)
      const docsText = scheme.documents.join('  |  ')
      const docsLines = doc.splitTextToSize(docsText, 176)
      doc.text(docsLines, 16, yPos)
      yPos += docsLines.length * 4 + 4

      // Apply link
      doc.setTextColor(44, 122, 44)
      doc.setFontSize(8)
      doc.text(`Apply at: ${scheme.applyLink}`, 16, yPos)
      yPos += 10

      // Divider
      doc.setDrawColor(200, 230, 200)
      doc.line(14, yPos, 196, yPos)
      yPos += 6
    })

    // Footer
    const pageCount = doc.internal.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFillColor(26, 61, 26)
      doc.rect(0, 285, 210, 12, 'F')
      doc.setTextColor(200, 200, 200)
      doc.setFontSize(8)
      doc.text('SchemeSaathi — Data sourced from official Government of India portals', 14, 292)
      doc.text(`Page ${i} of ${pageCount}`, 185, 292)
    }

    doc.save('SchemeSaathi-Eligible-Schemes.pdf')
  }

  return (
    <div className="results-page">
<nav className="navbar">
  <div className="nav-logo" onClick={() => navigate('/')} style={{cursor:'pointer'}}>
    SchemeSaathi
  </div>
  <div className="nav-buttons">
    <button className="nav-btn-outline" onClick={() => navigate('/')}>🏠 Home</button>
    <button className="nav-btn-solid" onClick={() => navigate('/find')}>Search Again</button>
  </div>
</nav>

      <div className="results-container">

        <div className="results-header">
          <h1>Your Eligible Schemes</h1>
          <p>{schemes.length > 0 ? `${schemes.length} scheme(s) found for you` : 'No schemes found'}</p>
        </div>

        {/* AI Summary */}
        {aiSummary && (
          <div className="ai-summary">
            <div className="ai-title">🤖 AI Summary</div>
            <p>{aiSummary}</p>
          </div>
        )}

        {/* No Results */}
        {schemes.length === 0 && (
          <div className="no-results">
            <p>😕 No schemes found matching your details.</p>
            <button className="submit-btn" onClick={() => navigate('/find')}>
              Try Again
            </button>
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
            <a href={scheme.applyLink} target="_blank" rel="noreferrer" className="apply-btn">
              Apply Now →
            </a>
          </div>
        ))}

        {/* PDF Download + Search Again */}
        {schemes.length > 0 && (
          <div style={{display:'flex', gap:'16px', marginTop:'32px', flexWrap:'wrap'}}>
            <button className="download-btn" onClick={downloadPDF}>
              📄 Download PDF
            </button>
            <button className="back-btn" onClick={() => navigate('/find')}>
              ← Search Again
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Results