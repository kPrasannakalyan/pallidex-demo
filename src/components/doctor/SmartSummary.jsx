function SmartSummary({ patientId, summary }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-medical-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Smart Summary
      </h2>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {!patientId ? (
          <div className="p-12 text-center text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-medium">Select a patient to view AI-generated summary</p>
            <p className="text-sm mt-1">Click "View Summary" on any patient in the list above</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-medical-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-medical-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-medical-blue-600 uppercase tracking-wide mb-2">AI-Generated Brief</p>
                <p className="text-gray-700 leading-relaxed">{summary}</p>
                <p className="text-xs text-gray-400 mt-4">This summary is generated from mock data for demonstration purposes.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default SmartSummary
