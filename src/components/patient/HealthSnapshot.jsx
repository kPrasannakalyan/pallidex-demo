function HealthSnapshot({ vitals }) {
  const vitalsArray = [
    vitals.bloodPressure,
    vitals.bloodSugar,
    vitals.weight,
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'border-l-green-500 bg-green-50/50'
      case 'elevated': return 'border-l-amber-500 bg-amber-50/50'
      case 'high': return 'border-l-red-500 bg-red-50/50'
      default: return 'border-l-medical-blue-500 bg-medical-blue-50/50'
    }
  }

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-medical-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Health Snapshot
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vitalsArray.map((vital, index) => (
          <div
            key={index}
            className={`rounded-xl border border-gray-200 border-l-4 p-5 bg-white shadow-sm hover:shadow-md transition-shadow ${getStatusColor(vital.status)}`}
          >
            <p className="text-sm font-medium text-gray-600 mb-1">{vital.label}</p>
            <p className="text-2xl font-bold text-gray-900">
              {vital.value}
              <span className="text-sm font-normal text-gray-500 ml-1">{vital.unit}</span>
            </p>
            <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium capitalize bg-white/80 text-gray-700">
              {vital.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HealthSnapshot
