import { useState } from 'react'

const SYMPTOM_OPTIONS = [
  'Headache', 'Fever', 'Fatigue', 'Cough', 'Sore throat', 'Body aches',
  'Nausea', 'Dizziness', 'Shortness of breath', 'Chest pain', 'Rash',
  'Abdominal pain', 'Joint pain', 'Loss of appetite', 'Insomnia'
]

function SymptomCheckerModal({ onClose }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-6 h-6 text-medical-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI Symptom Checker
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <p className="text-gray-600 mb-4">Select any symptoms you're experiencing. This is a mock demo—no real analysis is performed.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {SYMPTOM_OPTIONS.map((symptom) => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => toggleSymptom(symptom)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-medical-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional notes (optional)</label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Describe your symptoms in more detail..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-medical-blue-500 focus:border-medical-blue-500 outline-none resize-none"
                rows={3}
              />
            </form>
          ) : (
            <div className="bg-medical-blue-50 rounded-xl p-6 border border-medical-blue-100">
              <div className="flex items-center gap-2 text-medical-blue-700 font-semibold mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mock Analysis Complete
              </div>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Selected symptoms:</strong> {selectedSymptoms.join(', ') || 'None'}
              </p>
              <p className="text-gray-600 text-sm">
                This is a prototype. In production, an AI would analyze your symptoms and suggest next steps. For now, if you have concerns, please message your doctor directly.
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
          {!submitted ? (
            <>
              <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-medical-blue-600 text-white rounded-lg hover:bg-medical-blue-700 font-medium"
              >
                Analyze Symptoms
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2 bg-medical-blue-600 text-white rounded-lg hover:bg-medical-blue-700 font-medium"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SymptomCheckerModal
