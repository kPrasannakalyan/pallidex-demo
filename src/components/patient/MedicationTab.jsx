import { useMemo } from 'react'

const TIME_ORDER = ['Morning', 'Afternoon', 'Evening', 'Night']

function MedicationTab({ medications, medicationAdherence = {}, onToggleTaken }) {
  const today = new Date().toISOString().slice(0, 10)

  const getTakenState = (medId, timeSlot) => {
    const key = `${medId}-${timeSlot}`
    return (medicationAdherence[key] || []).includes(today)
  }

  const dosesByTime = useMemo(() => {
    const grouped = {}
    ;(medications || []).forEach((med) => {
      const times = med.times || [med.time || 'Morning']
      times.forEach((timeSlot) => {
        if (!grouped[timeSlot]) grouped[timeSlot] = []
        grouped[timeSlot].push({ ...med, timeSlot })
      })
    })
    const ordered = {}
    TIME_ORDER.forEach((t) => {
      if (grouped[t]) ordered[t] = grouped[t]
    })
    Object.keys(grouped).forEach((t) => {
      if (!ordered[t]) ordered[t] = grouped[t]
    })
    return ordered
  }, [medications])

  const getDoseKey = (med, timeSlot) => `${med.id}-${timeSlot}`

  const toggleTaken = (medId, timeSlot) => {
    const isTaken = getTakenState(medId, timeSlot)
    if (onToggleTaken) {
      onToggleTaken(medId, timeSlot, !isTaken)
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h3>
        <p className="text-sm text-gray-500 mb-6">Grouped by time of day. Medications taken multiple times appear in each slot.</p>

        {Object.keys(dosesByTime).length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-500">
            No medications on file for this patient.
          </div>
        ) : (
        Object.entries(dosesByTime).map(([timeSlot, doses]) => (
          <div key={timeSlot} className="mb-8">
            <h4 className="text-base font-medium text-medical-blue-700 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {timeSlot}
            </h4>
            <div className="space-y-4">
              {doses.map((med) => {
                const doseKey = getDoseKey(med, med.timeSlot)
                const isTaken = getTakenState(med.id, med.timeSlot)
                return (
                  <div
                    key={doseKey}
                    className={`rounded-xl border p-5 shadow-sm hover:shadow-md transition-all ${
                      isTaken ? 'border-green-200 bg-green-50/30' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        isTaken ? 'bg-green-100' : 'bg-medical-blue-100'
                      }`}>
                        <svg className={`w-6 h-6 ${isTaken ? 'text-green-600' : 'text-medical-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">{med.name}</p>
                        <p className="text-medical-blue-600 font-medium">{med.dosage} • {med.frequency}</p>
                        {med.notes && (
                          <p className="text-gray-500 text-sm mt-1 italic">{med.notes}</p>
                        )}
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-3">
                        <span className={`text-sm font-medium ${isTaken ? 'text-green-700' : 'text-gray-500'}`}>
                          {isTaken ? 'Taken' : 'Not taken'}
                        </span>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={isTaken}
                          onClick={() => toggleTaken(med.id, med.timeSlot)}
                          className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-medical-blue-500 focus:ring-offset-2 ${
                            isTaken ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition-transform ${
                              isTaken ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))
        )}
      </section>
    </div>
  )
}

export default MedicationTab
