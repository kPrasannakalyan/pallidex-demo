import { useState } from 'react'

function LandingPage({ onSelect }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-medical-blue-100 mb-6">
          <svg className="w-8 h-8 text-medical-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HealthConnect</h1>
        <p className="text-gray-600 mb-12">Official Doctor-Patient Communication Platform</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onSelect('patient')}
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl border-2 border-medical-blue-200 bg-white hover:bg-medical-blue-50 hover:border-medical-blue-400 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-medical-blue-100 flex items-center justify-center group-hover:bg-medical-blue-200 transition-colors">
              <svg className="w-6 h-6 text-medical-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="text-left">
              <span className="font-semibold text-gray-900 block">Patient</span>
              <span className="text-sm text-gray-500">View health snapshot & message doctor</span>
            </div>
          </button>

          <button
            onClick={() => onSelect('doctor')}
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl border-2 border-medical-blue-200 bg-white hover:bg-medical-blue-50 hover:border-medical-blue-400 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-medical-blue-100 flex items-center justify-center group-hover:bg-medical-blue-200 transition-colors">
              <svg className="w-6 h-6 text-medical-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-left">
              <span className="font-semibold text-gray-900 block">Doctor</span>
              <span className="text-sm text-gray-500">View patients & smart summaries</span>
            </div>
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-400">Secure • HIPAA Compliant • Trusted by Healthcare Providers</p>
      </div>
    </div>
  )
}

export default LandingPage
