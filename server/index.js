import { createServer } from 'http'
import { Server } from 'socket.io'
import express from 'express'

const PORT = process.env.PORT || 3001
const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: { origin: '*' },
})

// In-memory store: syncData[patientId] = { foodLog, medicationAdherence, chatMessages }
const getPast30Days = () => {
  const dates = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    dates.push(d.toISOString().slice(0, 10))
  }
  return dates
}

const pickTakenDates = (dates, pct) => dates.filter((_, i) => (i * 17 + 7) % 100 < pct)

const seedPatient1 = () => {
  const days = getPast30Days()
  return {
    foodLog: [
      { id: 1, meal: 'Breakfast', items: 'Toast, eggs, coffee', time: '8:00 AM', timestamp: '2025-02-27T08:00:00', calories: 380 },
      { id: 2, meal: 'Lunch', items: 'Sandwich, chips', time: '1:00 PM', timestamp: '2025-02-27T13:00:00', calories: 520 },
      { id: 3, meal: 'Dinner', items: 'Pasta, salad', time: '6:30 PM', timestamp: '2025-02-27T18:30:00', calories: 610 },
    ],
    medicationAdherence: {
      '1-Morning': pickTakenDates(days, 73),
      '2-Evening': pickTakenDates(days, 77),
    },
    chatMessages: [
      { id: 1, sender: 'doctor', text: "Sarah, I've reviewed your BP readings. Let's increase your Lisinopril dosage.", timestamp: '9:15 AM' },
      { id: 2, sender: 'patient', text: "I've been feeling dizzy in the mornings. Is that normal?", timestamp: '9:20 AM' },
      { id: 3, sender: 'doctor', text: "Let's monitor that. Try taking it with a full meal. Call if it persists.", timestamp: '9:25 AM' },
    ],
  }
}

const syncData = {
  1: seedPatient1(),
}

io.on('connection', (socket) => {
  socket.on('join', ({ role, patientId }) => {
    const pid = patientId || 1
    socket.patientId = pid
    socket.role = role
    socket.join(`patient-${pid}`)
    socket.emit('sync:response', { patientId: pid, data: syncData[pid] || null })
  })

  socket.on('sync:request', ({ patientId }) => {
    const pid = patientId || 1
    socket.emit('sync:response', { patientId: pid, data: syncData[pid] || null })
  })

  socket.on('food:add', ({ patientId, entry }) => {
    const pid = patientId || 1
    if (!syncData[pid]) syncData[pid] = { foodLog: [], medicationAdherence: {}, chatMessages: [] }
    const data = syncData[pid]
    const maxId = data.foodLog.length ? Math.max(...data.foodLog.map((e) => e.id)) : 0
    const newEntry = { ...entry, id: maxId + 1 }
    data.foodLog.push(newEntry)
    io.to(`patient-${pid}`).emit('food:updated', { patientId: pid, foodLog: data.foodLog })
  })

  socket.on('medication:toggle', ({ patientId, medId, timeSlot, date, taken }) => {
    const pid = patientId || 1
    if (!syncData[pid]) syncData[pid] = { foodLog: [], medicationAdherence: {}, chatMessages: [] }
    const data = syncData[pid]
    const key = `${medId}-${timeSlot}`
    if (!data.medicationAdherence[key]) data.medicationAdherence[key] = []
    const arr = data.medicationAdherence[key]
    if (taken) {
      if (!arr.includes(date)) arr.push(date)
    } else {
      const idx = arr.indexOf(date)
      if (idx >= 0) arr.splice(idx, 1)
    }
    io.to(`patient-${pid}`).emit('medication:updated', { patientId: pid, medicationAdherence: { ...data.medicationAdherence } })
  })

  socket.on('chat:send', ({ patientId, message }) => {
    const pid = patientId || 1
    if (!syncData[pid]) syncData[pid] = { foodLog: [], medicationAdherence: {}, chatMessages: [] }
    const data = syncData[pid]
    const maxId = data.chatMessages.length ? Math.max(...data.chatMessages.map((m) => m.id)) : 0
    const newMsg = { ...message, id: maxId + 1 }
    data.chatMessages.push(newMsg)
    io.to(`patient-${pid}`).emit('chat:updated', { patientId: pid, chatMessages: data.chatMessages })
  })
})

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Sync server running on http://0.0.0.0:${PORT}`)
})
