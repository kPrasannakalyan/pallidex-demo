import { useState } from 'react'
import { SyncProvider } from './context/SyncContext'
import LandingPage from './components/LandingPage'
import PatientView from './components/PatientView'
import DoctorView from './components/DoctorView'

const SYNC_PATIENT_ID = 1

function App() {
  const [role, setRole] = useState(null)

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole)
  }

  const handleBack = () => {
    setRole(null)
  }

  return (
    <SyncProvider patientId={SYNC_PATIENT_ID}>
      <div className="min-h-screen bg-white">
        {!role && <LandingPage onSelect={handleRoleSelect} />}
        {role === 'patient' && <PatientView onBack={handleBack} patientId={SYNC_PATIENT_ID} />}
        {role === 'doctor' && <DoctorView onBack={handleBack} />}
      </div>
    </SyncProvider>
  )
}

export default App
