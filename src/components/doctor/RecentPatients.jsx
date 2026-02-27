function RecentPatients({ patients, selectedPatient, onSelectPatient }) {
  const getRiskColor = (status) => {
    switch (status) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'stable': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRiskLabel = (status) => {
    switch (status) {
      case 'high': return 'High Priority'
      case 'medium': return 'Monitor'
      case 'stable': return 'Stable'
      default: return status
    }
  }

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-medical-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Recent Patients
      </h2>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Patient</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Condition</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Risk Score</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Last Visit</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className={`hover:bg-gray-50/50 transition-colors ${
                    selectedPatient === patient.id ? 'bg-medical-blue-50/50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{patient.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{patient.condition}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{patient.riskScore}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(patient.status)}`}>
                      {getRiskLabel(patient.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{patient.lastVisit}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onSelectPatient(patient.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedPatient === patient.id
                          ? 'bg-medical-blue-600 text-white'
                          : 'bg-medical-blue-100 text-medical-blue-700 hover:bg-medical-blue-200'
                      }`}
                    >
                      View Patient
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default RecentPatients
