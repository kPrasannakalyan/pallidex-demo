import { useState, useEffect } from 'react'
import { patientVitals } from '../../data/mockData'
import HealthSnapshot from './HealthSnapshot'

function FoodTab({ foodLog: initialFoodLog, vitals, readOnly = false, onAddFood, useSync = false }) {
  const [localFoodLog, setLocalFoodLog] = useState(initialFoodLog)
  const [newEntry, setNewEntry] = useState('')

  useEffect(() => {
    if (!useSync) setLocalFoodLog(initialFoodLog)
  }, [initialFoodLog, useSync])

  const foodLog = useSync ? initialFoodLog : localFoodLog
  const totalCalories = foodLog.reduce((sum, entry) => sum + (entry.calories || 0), 0)

  const handleAddEntry = (e) => {
    e.preventDefault()
    if (!newEntry.trim()) return
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const timestamp = now.toISOString()
    const newFoodEntry = {
      meal: 'Custom',
      items: newEntry.trim(),
      time: timeStr,
      timestamp,
      calories: null,
    }
    if (useSync && onAddFood) {
      onAddFood(newFoodEntry)
    } else {
      const maxId = localFoodLog.length ? Math.max(...localFoodLog.map((e) => e.id)) : 0
      setLocalFoodLog([...localFoodLog, { ...newFoodEntry, id: maxId + 1 }])
    }
    setNewEntry('')
  }

  const displayVitals = vitals || patientVitals

  return (
    <div className="space-y-8">
      <HealthSnapshot vitals={displayVitals} />
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Food Log</h3>
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {foodLog.map((entry) => (
              <div key={entry.id} className="p-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{entry.meal}</p>
                    <p className="text-gray-600 text-sm mt-0.5">{entry.items}</p>
                    <p className="text-xs text-gray-400 mt-1">{entry.time}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-medical-blue-50 text-medical-blue-700 text-sm font-medium">
                    {entry.calories != null ? `${entry.calories} cal` : '—'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Total: ~{totalCalories} calories</p>

        {!readOnly && (
          <form onSubmit={handleAddEntry} className="mt-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="Add food entry (e.g., Snack: Banana and peanut butter)"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-medical-blue-500 focus:border-medical-blue-500 outline-none"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-medical-blue-600 text-white rounded-lg hover:bg-medical-blue-700 transition-colors font-medium"
              >
                Add
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}

export default FoodTab
