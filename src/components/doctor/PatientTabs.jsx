import { useState } from 'react'
import { useSync } from '../../context/SyncContext'
import FoodTab from '../patient/FoodTab'
import MedicationAdherenceView from './MedicationAdherenceView'
import MessageDoctor from '../patient/MessageDoctor'
import SmartSummary from './SmartSummary'

const SYNC_PATIENT_ID = 1

const TABS = [
  { id: 'food', label: 'Food', icon: FoodIcon },
  { id: 'medication', label: 'Medication', icon: MedicationIcon },
  { id: 'chat', label: 'Chat', icon: ChatIcon },
  { id: 'summary', label: 'Summary', icon: SummaryIcon },
]

function FoodIcon({ active }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-medical-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
}

function MedicationIcon({ active }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-medical-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  )
}

function ChatIcon({ active }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-medical-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}

function SummaryIcon({ active }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-medical-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function PatientTabs({ patientId, patientName, patientData, summary }) {
  const [activeTab, setActiveTab] = useState('summary')
  const sync = useSync(SYNC_PATIENT_ID)

  if (!patientData) return null

  const useSyncedData = patientId === SYNC_PATIENT_ID && sync
  const foodLog = useSyncedData ? sync.foodLog : patientData.foodLog
  const medicationAdherence = useSyncedData ? sync.medicationAdherence : patientData.medicationAdherence
  const chatMessages = useSyncedData ? sync.chatMessages : patientData.chatMessages
  const { vitals, medications } = patientData

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Viewing: {patientName}</h3>
      </div>

      <div className="flex gap-1 border-b border-gray-200 -mb-px">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-medical-blue-600 text-medical-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <tab.icon active={activeTab === tab.id} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pt-2">
        {activeTab === 'food' && (
          <FoodTab foodLog={foodLog} vitals={vitals} readOnly />
        )}
        {activeTab === 'medication' && (
          <MedicationAdherenceView medications={medications} medicationAdherence={medicationAdherence} />
        )}
        {activeTab === 'chat' && (
          <MessageDoctor
            messages={chatMessages}
            senderRole="doctor"
            onSendMessage={useSyncedData ? sync.sendMessage : undefined}
            useSync={useSyncedData}
          />
        )}
        {activeTab === 'summary' && (
          <SmartSummary patientId={true} summary={summary} />
        )}
      </div>
    </div>
  )
}

export default PatientTabs
