import { useState } from 'react'

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! 👋 I am SchemeSaathi, your Government Scheme Assistant. Ask me anything about schemes, eligibility, or documents!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')

    const updatedMessages = [...messages, { role: 'user', text: userMessage }]
    setMessages(updatedMessages)
    setLoading(true)

    try {
      const response = await fetch('https://schemesaathi-k0of.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: updatedMessages
        })
      })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Kuch technical issue aa gaya. Please try again! 🔄' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <>
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>🤖 SchemeSaathi</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                {msg.role === 'bot' && <span className="bot-icon">🤖</span>}
                <div className="msg-bubble">{msg.text}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg bot">
                <span className="bot-icon">🤖</span>
                <div className="msg-bubble typing">Typing...</div>
              </div>
            )}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask about any scheme..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button onClick={sendMessage} disabled={loading}>➤</button>
          </div>
        </div>
      )}

      <button className="chatbot-fab" onClick={() => setOpen(!open)}>
        {open ? '✕' : '💬'}
      </button>
    </>
  )
}

export default Chatbot