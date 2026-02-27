import { useMemo } from 'react'

const TIME_ORDER = ['Morning', 'Afternoon', 'Evening', 'Night']

function MedicationAdherenceView({ medications, medicationAdherence = {} }) {
  const past30Days = useMemo(() => {
    const dates = []
    for (let i = 29; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      dates.push(d)
    }
    return dates
  }, [])

  const dosesWithAdherence = useMemo(() => {
    const result = []
    ;(medications || []).forEach((med) => {
      const times = med.times || [med.time || 'Morning']
      times.forEach((timeSlot) => {
        const key = `${med.id}-${timeSlot}`
        const takenDates = new Set(medicationAdherence[key] || [])
        result.push({ ...med, timeSlot, takenDates })
      })
    })
    return result
  }, [medications, medicationAdherence])

  if (dosesWithAdherence.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-500">
        No medications on file for this patient.
      </div>
    )
  }

  const formatDate = (d) => d.toISOString().slice(0, 10)
  const formatDay = (d) => d.getDate()
  const formatMonthDay = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div className="space-y-8">
      <p className="text-sm text-gray-500">
        Medication adherence over the past 30 days. Green = taken, Gray = missed.
      </p>

      {dosesWithAdherence.map(({ id, name, dosage, frequency, timeSlot, notes, takenDates }) => {
        const takenCount = past30Days.filter((d) => takenDates.has(formatDate(d))).length
        const adherencePct = Math.round((takenCount / 30) * 100)

        return (
          <div key={`${id}-${timeSlot}`} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <p className="font-semibold text-gray-900">{name}</p>
                <p className="text-medical-blue-600 text-sm">{dosage} • {timeSlot}</p>
                {notes && <p className="text-gray-500 text-xs mt-0.5 italic">{notes}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  adherencePct >= 90 ? 'bg-green-100 text-green-800' :
                  adherencePct >= 70 ? 'bg-amber-100 text-amber-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {adherencePct}% adherence
                </span>
                <span className="text-gray-500 text-sm">{takenCount}/30 days</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {past30Days.map((d) => {
                const taken = takenDates.has(formatDate(d))
                return (
                  <div
                    key={formatDate(d)}
                    title={`${formatMonthDay(d)}: ${taken ? 'Taken' : 'Missed'}`}
                    className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium ${
                      taken ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {formatDay(d)}
                  </div>
                )
              })}
            </div>

            <p className="text-xs text-gray-400 mt-2">Each cell = one day (oldest ← → today)</p>
          </div>
        )
      })}
    </div>
  )
}

export default MedicationAdherenceView
