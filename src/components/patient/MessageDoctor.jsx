import { useState, useEffect } from 'react'

function MessageDoctor({ messages, senderRole = 'patient', onSendMessage, useSync = false }) {
  const [inputValue, setInputValue] = useState('')
  const [localMessages, setLocalMessages] = useState(messages)

  useEffect(() => {
    if (!useSync) setLocalMessages(messages)
  }, [messages, useSync])

  const displayMessages = useSync ? messages : localMessages

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    const newMsg = {
      sender: senderRole,
      text: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    if (useSync && onSendMessage) {
      onSendMessage(newMsg)
    } else {
      setLocalMessages((prev) => [...prev, { ...newMsg, id: prev.length + 1 }])
    }
    setInputValue('')
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-medical-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {senderRole === 'doctor' ? 'Chat with Patient' : 'Message Doctor'}
      </h2>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {displayMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === senderRole ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  msg.sender === senderRole
                    ? 'bg-medical-blue-600 text-white rounded-br-md'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === senderRole ? 'text-medical-blue-100' : 'text-gray-400'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={senderRole === 'doctor' ? 'Send message to patient...' : 'Type your message...'}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-medical-blue-500 focus:border-medical-blue-500 outline-none"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-medical-blue-600 text-white rounded-lg hover:bg-medical-blue-700 transition-colors font-medium"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default MessageDoctor
