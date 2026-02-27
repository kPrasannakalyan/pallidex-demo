import { useState } from 'react'
import { useSync } from '../context/SyncContext'
import { patientData } from '../data/mockData'
import FoodTab from './patient/FoodTab'
import MedicationTab from './patient/MedicationTab'
import MessageDoctor from './patient/MessageDoctor'
import SymptomCheckerModal from './patient/SymptomCheckerModal'

const TABS = [
  { id: 'food', label: 'Food', icon: FoodIcon },
  { id: 'medication', label: 'Medication', icon: MedicationIcon },
  { id: 'chat', label: 'Doctor Chat', icon: ChatIcon },
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

function PatientView({ onBack, patientId = 1 }) {
  const [activeTab, setActiveTab] = useState('food')
  const [showSymptomChecker, setShowSymptomChecker] = useState(false)
  const sync = useSync(patientId)
  const patientInfo = patientData[patientId]
  const medications = patientInfo?.medications || []
  const vitals = patientInfo?.vitals

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-medical-blue-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Patient Portal</h1>
          <button
            onClick={() => setShowSymptomChecker(true)}
            className="flex items-center gap-2 px-4 py-2 bg-medical-blue-600 text-white rounded-lg hover:bg-medical-blue-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI Symptom Checker
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-4 border-t border-gray-100">
          <div className="flex gap-1 -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
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
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'food' && (
          <FoodTab
            foodLog={sync?.foodLog ?? []}
            vitals={vitals}
            onAddFood={sync?.addFood}
            useSync={!!sync}
          />
        )}
        {activeTab === 'medication' && (
          <MedicationTab
            medications={medications}
            medicationAdherence={sync?.medicationAdherence ?? {}}
            onToggleTaken={sync?.toggleMedication}
          />
        )}
        {activeTab === 'chat' && (
          <MessageDoctor
            messages={sync?.chatMessages ?? []}
            senderRole="patient"
            onSendMessage={sync?.sendMessage}
            useSync={!!sync}
          />
        )}
      </main>

      {showSymptomChecker && (
        <SymptomCheckerModal onClose={() => setShowSymptomChecker(false)} />
      )}
    </div>
  )
}

export default PatientView
