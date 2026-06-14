import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const states = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi",
  "Gujarat", "Haryana", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttarakhand", "Uttar Pradesh", "West Bengal"
]

function Form() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    age: '', income: '', gender: '', category: '', state: '', occupation: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.age || !formData.income || !formData.gender ||
        !formData.category || !formData.state || !formData.occupation) {
      alert('Please fill all fields!')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('https://schemesaathi-k0of.onrender.com/api/schemes/find', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
          income: parseInt(formData.income)
        })
      })
      const data = await response.json()
      navigate('/results', { state: { results: data } })
    } catch (err) {
      alert('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-page">

      {/* NAVBAR */}
    <nav className="navbar">
  <div className="nav-logo" onClick={() => navigate('/')} style={{cursor:'pointer'}}>
    SchemeSaathi
  </div>
  <div className="nav-buttons">
    <button className="nav-btn-outline" onClick={() => navigate('/')}>🏠 Home</button>
  </div>
</nav>

      <div className="form-container">
  <div className="form-header">
    <button className="back-link" onClick={() => navigate('/')}>
      ← Back to Home
    </button>
    <h1>Enter Your Details</h1>
    <p>Fill in your information to discover schemes you qualify for</p>
  </div>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">

              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="e.g. 24"
                  value={formData.age}
                  onChange={handleChange}
                  min="0" max="120"
                />
              </div>

              <div className="form-group">
                <label>Annual Family Income (₹)</label>
                <input
                  type="number"
                  name="income"
                  placeholder="e.g. 250000"
                  value={formData.income}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="OBC">OBC</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="form-group">
                <label>State</label>
                <select name="state" value={formData.state} onChange={handleChange}>
                  <option value="">Select State</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Occupation</label>
                <select name="occupation" value={formData.occupation} onChange={handleChange}>
                  <option value="">Select Occupation</option>
                  <option value="student">Student</option>
                  <option value="farmer">Farmer</option>
                  <option value="salaried">Salaried Employee</option>
                  <option value="selfemployed">Self Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="other">Other</option>
                </select>
              </div>

            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '🔄 Finding Schemes...' : '🔍 Find My Schemes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form