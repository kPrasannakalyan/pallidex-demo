import { useState } from 'react'
import { recentPatients, patientSmartSummaries, patientData } from '../data/mockData'
import RecentPatients from './doctor/RecentPatients'
import PatientTabs from './doctor/PatientTabs'

function DoctorView({ onBack }) {
  const [selectedPatient, setSelectedPatient] = useState(null)

  const selectedPatientInfo = selectedPatient
    ? recentPatients.find((p) => p.id === selectedPatient)
    : null

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
          <h1 className="text-xl font-semibold text-gray-900">Doctor Portal</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <RecentPatients
          patients={recentPatients}
          selectedPatient={selectedPatient}
          onSelectPatient={setSelectedPatient}
        />

        {selectedPatient && selectedPatientInfo && (
          <PatientTabs
            patientId={selectedPatient}
            patientName={selectedPatientInfo.name}
            patientData={patientData[selectedPatient]}
            summary={patientSmartSummaries[selectedPatient]}
          />
        )}
      </main>
    </div>
  )
}

export default DoctorView
