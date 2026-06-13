import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Form from './pages/Form'
import Results from './pages/Results'
import History from './pages/History'
import Browse from './pages/Browse'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Chatbot from './components/Chatbot'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/find" element={<Form />} />
        <Route path="/results" element={<Results />} />
        <Route path="/history" element={<History />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Chatbot />
    </>
  )
}

export default App