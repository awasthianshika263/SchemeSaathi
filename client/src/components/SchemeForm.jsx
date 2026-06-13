import { useState } from 'react'

const states = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi",
  "Gujarat", "Haryana", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttarakhand", "Uttar Pradesh", "West Bengal"
]

function SchemeForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    gender: '',
    category: '',
    state: '',
    occupation: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.age || !formData.income || !formData.gender ||
        !formData.category || !formData.state || !formData.occupation) {
      alert('Please fill all fields!')
      return
    }

    onSubmit({
      ...formData,
      age: parseInt(formData.age),
      income: parseInt(formData.income)
    })
  }

  return (
    <div className="form-card">
      <h2>Enter Your Details</h2>
      <p className="subtitle">Fill in your information to discover schemes you qualify for</p>

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
              min="0"
              max="120"
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
              {states.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
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

        <button type="submit" className="find-btn" disabled={loading}>
          {loading ? '🔄 Finding Schemes...' : '🔍 Find My Schemes'}
        </button>
      </form>
    </div>
  )
}

export default SchemeForm