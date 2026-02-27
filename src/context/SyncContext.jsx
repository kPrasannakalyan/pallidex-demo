import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:3001'

const SyncContext = createContext(null)

export function SyncProvider({ children, patientId = 1 }) {
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)
  const [foodLog, setFoodLog] = useState([])
  const [medicationAdherence, setMedicationAdherence] = useState({})
  const [chatMessages, setChatMessages] = useState([])

  useEffect(() => {
    const s = io(WS_URL, { autoConnect: true })
    setSocket(s)

    s.on('connect', () => {
      setConnected(true)
      s.emit('join', { role: 'client', patientId })
    })

    s.on('disconnect', () => setConnected(false))

    s.on('sync:response', ({ patientId: pid, data }) => {
      if (pid !== patientId) return
      if (data) {
        setFoodLog(data.foodLog || [])
        setMedicationAdherence(data.medicationAdherence || {})
        setChatMessages(data.chatMessages || [])
      }
    })

    s.on('food:updated', ({ patientId: pid, foodLog: log }) => {
      if (pid === patientId) setFoodLog(log || [])
    })

    s.on('medication:updated', ({ patientId: pid, medicationAdherence: adherence }) => {
      if (pid === patientId) setMedicationAdherence(adherence || {})
    })

    s.on('chat:updated', ({ patientId: pid, chatMessages: msgs }) => {
      if (pid === patientId) setChatMessages(msgs || [])
    })

    return () => {
      s.disconnect()
    }
  }, [patientId])

  const addFood = (entry) => {
    if (socket?.connected) {
      socket.emit('food:add', { patientId, entry })
    }
  }

  const toggleMedication = (medId, timeSlot, taken) => {
    const today = new Date().toISOString().slice(0, 10)
    if (socket?.connected) {
      socket.emit('medication:toggle', { patientId, medId, timeSlot, date: today, taken })
    }
  }

  const sendMessage = (message) => {
    if (socket?.connected) {
      socket.emit('chat:send', { patientId, message })
    }
  }

  const requestSync = () => {
    if (socket?.connected) {
      socket.emit('sync:request', { patientId })
    }
  }

  const value = {
    connected,
    foodLog,
    medicationAdherence,
    chatMessages,
    addFood,
    toggleMedication,
    sendMessage,
    requestSync,
  }

  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>
}

export function useSync(patientId) {
  const ctx = useContext(SyncContext)
  if (!ctx) return null
  return ctx
}
