// Mock data for Health Maintenance Prototype

export const patientVitals = {
  bloodPressure: { value: "120/80", unit: "mmHg", status: "normal", label: "Blood Pressure" },
  bloodSugar: { value: "98", unit: "mg/dL", status: "normal", label: "Blood Sugar" },
  weight: { value: "72", unit: "kg", status: "normal", label: "Weight" },
};

export const foodLog = [
  { id: 1, meal: "Breakfast", items: "Oatmeal with berries, Greek yogurt", time: "7:30 AM", timestamp: "2025-02-27T07:30:00", calories: 320 },
  { id: 2, meal: "Lunch", items: "Grilled chicken salad, whole grain bread", time: "12:45 PM", timestamp: "2025-02-27T12:45:00", calories: 450 },
  { id: 3, meal: "Snack", items: "Apple, handful of almonds", time: "3:00 PM", timestamp: "2025-02-27T15:00:00", calories: 180 },
  { id: 4, meal: "Dinner", items: "Baked salmon, steamed vegetables, brown rice", time: "7:00 PM", timestamp: "2025-02-27T19:00:00", calories: 520 },
];

export const medications = [
  { id: 1, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", times: ["Morning"], notes: "Take with breakfast" },
  { id: 2, name: "Metformin", dosage: "500mg", frequency: "Twice daily", times: ["Morning", "Evening"], notes: "Take with meals" },
  { id: 3, name: "Vitamin D3", dosage: "2000 IU", frequency: "Once daily", times: ["Morning"], notes: "With food" },
];

export const chatMessages = [
  { id: 1, sender: "doctor", text: "Hello! I've reviewed your recent vitals. Your blood pressure looks good. Keep up the healthy lifestyle!", timestamp: "10:30 AM" },
  { id: 2, sender: "patient", text: "Thank you, Doctor. I've been following the diet plan you suggested.", timestamp: "10:32 AM" },
  { id: 3, sender: "doctor", text: "That's excellent to hear. Let's schedule a follow-up in 2 weeks. Any concerns in the meantime?", timestamp: "10:35 AM" },
  { id: 4, sender: "patient", text: "No major concerns. Just wanted to check in about my medication timing.", timestamp: "10:38 AM" },
  { id: 5, sender: "doctor", text: "Take your medication with breakfast. Consistency is key. I'll send you a reminder note.", timestamp: "10:40 AM" },
];

export const recentPatients = [
  { id: 1, name: "Sarah Mitchell", riskScore: 85, status: "high", lastVisit: "2 days ago", condition: "Hypertension" },
  { id: 2, name: "James Wilson", riskScore: 25, status: "stable", lastVisit: "1 week ago", condition: "Routine checkup" },
  { id: 3, name: "Emily Chen", riskScore: 72, status: "high", lastVisit: "3 days ago", condition: "Diabetes management" },
  { id: 4, name: "Michael Brown", riskScore: 15, status: "stable", lastVisit: "2 weeks ago", condition: "Annual physical" },
  { id: 5, name: "Lisa Anderson", riskScore: 58, status: "medium", lastVisit: "5 days ago", condition: "Cardiac follow-up" },
];

export const patientSmartSummaries = {
  1: "Sarah Mitchell (85 y/o): High-priority patient. BP elevated at 145/92 on last reading. Recent medication adjustment. Recommend urgent follow-up. Patient reports occasional dizziness. Consider 24hr BP monitoring.",
  2: "James Wilson (42 y/o): Stable. All vitals within normal range. Completed annual physical. No concerns. Next scheduled visit in 6 months.",
  3: "Emily Chen (58 y/o): Elevated HbA1c at 7.8%. Blood sugar readings show post-meal spikes. Diet counseling recommended. Patient compliant with medication. Schedule diabetes education session.",
  4: "Michael Brown (35 y/o): Excellent health markers. BMI 22, all labs normal. Continue preventive care. No action needed.",
  5: "Lisa Anderson (61 y/o): Post-cardiac event recovery. ECG stable. Patient reports improved energy. Medication adherence good. Continue current regimen, re-evaluate in 4 weeks.",
};

// Helper: generate past 30 days of dates
const getPast30Days = () => {
  const dates = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    dates.push(d.toISOString().slice(0, 10))
  }
  return dates
}

// Helper: pick ~pct% of dates as "taken" (for mock adherence)
const pickTakenDates = (dates, pct) => {
  return dates.filter((_, i) => (i * 17 + 7) % 100 < pct)
}

// Per-patient data for doctor view (same structure as patient portal)
export const patientData = {
  1: {
    vitals: { bloodPressure: { value: "145/92", unit: "mmHg", status: "high", label: "Blood Pressure" }, bloodSugar: { value: "112", unit: "mg/dL", status: "elevated", label: "Blood Sugar" }, weight: { value: "78", unit: "kg", status: "normal", label: "Weight" } },
    foodLog: [
      { id: 1, meal: "Breakfast", items: "Toast, eggs, coffee", time: "8:00 AM", timestamp: "2025-02-27T08:00:00", calories: 380 },
      { id: 2, meal: "Lunch", items: "Sandwich, chips", time: "1:00 PM", timestamp: "2025-02-27T13:00:00", calories: 520 },
      { id: 3, meal: "Dinner", items: "Pasta, salad", time: "6:30 PM", timestamp: "2025-02-27T18:30:00", calories: 610 },
    ],
    medications: [
      { id: 1, name: "Lisinopril", dosage: "20mg", frequency: "Once daily", times: ["Morning"], notes: "Take with breakfast" },
      { id: 2, name: "Amlodipine", dosage: "5mg", frequency: "Once daily", times: ["Evening"], notes: "At bedtime" },
    ],
    chatMessages: [
      { id: 1, sender: "doctor", text: "Sarah, I've reviewed your BP readings. Let's increase your Lisinopril dosage.", timestamp: "9:15 AM" },
      { id: 2, sender: "patient", text: "I've been feeling dizzy in the mornings. Is that normal?", timestamp: "9:20 AM" },
      { id: 3, sender: "doctor", text: "Let's monitor that. Try taking it with a full meal. Call if it persists.", timestamp: "9:25 AM" },
    ],
    medicationAdherence: (() => {
      const days = getPast30Days()
      return {
        "1-Morning": pickTakenDates(days, 73),
        "2-Evening": pickTakenDates(days, 77),
      }
    })(),
  },
  2: {
    vitals: { bloodPressure: { value: "118/76", unit: "mmHg", status: "normal", label: "Blood Pressure" }, bloodSugar: { value: "92", unit: "mg/dL", status: "normal", label: "Blood Sugar" }, weight: { value: "82", unit: "kg", status: "normal", label: "Weight" } },
    foodLog: [
      { id: 1, meal: "Breakfast", items: "Oatmeal with berries, Greek yogurt", time: "7:30 AM", timestamp: "2025-02-27T07:30:00", calories: 320 },
      { id: 2, meal: "Lunch", items: "Grilled chicken salad, whole grain bread", time: "12:45 PM", timestamp: "2025-02-27T12:45:00", calories: 450 },
      { id: 3, meal: "Snack", items: "Apple, handful of almonds", time: "3:00 PM", timestamp: "2025-02-27T15:00:00", calories: 180 },
      { id: 4, meal: "Dinner", items: "Baked salmon, steamed vegetables, brown rice", time: "7:00 PM", timestamp: "2025-02-27T19:00:00", calories: 520 },
    ],
    medications: [
      { id: 1, name: "Vitamin D3", dosage: "2000 IU", frequency: "Once daily", times: ["Morning"], notes: "With food" },
    ],
    chatMessages: [
      { id: 1, sender: "doctor", text: "Your annual physical results look great, James!", timestamp: "10:30 AM" },
      { id: 2, sender: "patient", text: "Thanks! When should I schedule my next checkup?", timestamp: "10:35 AM" },
      { id: 3, sender: "doctor", text: "In 6 months. Keep up the healthy habits.", timestamp: "10:40 AM" },
    ],
    medicationAdherence: (() => {
      const days = getPast30Days()
      return { "1-Morning": pickTakenDates(days, 97) }
    })(),
  },
  3: {
    vitals: { bloodPressure: { value: "132/84", unit: "mmHg", status: "elevated", label: "Blood Pressure" }, bloodSugar: { value: "158", unit: "mg/dL", status: "high", label: "Blood Sugar" }, weight: { value: "71", unit: "kg", status: "normal", label: "Weight" } },
    foodLog: [
      { id: 1, meal: "Breakfast", items: "Cereal, milk, banana", time: "7:00 AM", timestamp: "2025-02-27T07:00:00", calories: 350 },
      { id: 2, meal: "Lunch", items: "Rice bowl with vegetables", time: "12:30 PM", timestamp: "2025-02-27T12:30:00", calories: 480 },
      { id: 3, meal: "Snack", items: "Yogurt", time: "4:00 PM", timestamp: "2025-02-27T16:00:00", calories: 120 },
      { id: 4, meal: "Dinner", items: "Stir-fry chicken, quinoa", time: "7:30 PM", timestamp: "2025-02-27T19:30:00", calories: 540 },
    ],
    medications: [
      { id: 1, name: "Metformin", dosage: "500mg", frequency: "Twice daily", times: ["Morning", "Evening"], notes: "Take with meals" },
    ],
    medicationAdherence: (() => {
      const days = getPast30Days()
      return {
        "1-Morning": pickTakenDates(days, 83),
        "1-Evening": pickTakenDates(days, 80),
      }
    })(),
  },
  4: {
    vitals: { bloodPressure: { value: "112/70", unit: "mmHg", status: "normal", label: "Blood Pressure" }, bloodSugar: { value: "88", unit: "mg/dL", status: "normal", label: "Blood Sugar" }, weight: { value: "75", unit: "kg", status: "normal", label: "Weight" } },
    foodLog: [
      { id: 1, meal: "Breakfast", items: "Smoothie, granola", time: "8:00 AM", timestamp: "2025-02-27T08:00:00", calories: 400 },
      { id: 2, meal: "Lunch", items: "Turkey wrap, fruit", time: "1:00 PM", timestamp: "2025-02-27T13:00:00", calories: 420 },
      { id: 3, meal: "Dinner", items: "Grilled fish, roasted veggies", time: "7:00 PM", timestamp: "2025-02-27T19:00:00", calories: 480 },
    ],
    medications: [],
    medicationAdherence: {},
    chatMessages: [
      { id: 1, sender: "patient", text: "Quick question about my lab results.", timestamp: "11:00 AM" },
      { id: 2, sender: "doctor", text: "All your labs came back normal. No action needed.", timestamp: "11:15 AM" },
    ],
  },
  5: {
    vitals: { bloodPressure: { value: "128/78", unit: "mmHg", status: "normal", label: "Blood Pressure" }, bloodSugar: { value: "102", unit: "mg/dL", status: "normal", label: "Blood Sugar" }, weight: { value: "68", unit: "kg", status: "normal", label: "Weight" } },
    foodLog: [
      { id: 1, meal: "Breakfast", items: "Oatmeal, apple", time: "7:45 AM", timestamp: "2025-02-27T07:45:00", calories: 280 },
      { id: 2, meal: "Lunch", items: "Soup, salad, whole grain roll", time: "12:00 PM", timestamp: "2025-02-27T12:00:00", calories: 380 },
      { id: 3, meal: "Dinner", items: "Baked chicken, sweet potato, greens", time: "6:30 PM", timestamp: "2025-02-27T18:30:00", calories: 520 },
    ],
    medications: [
      { id: 1, name: "Aspirin", dosage: "81mg", frequency: "Once daily", times: ["Morning"], notes: "Low-dose, with food" },
      { id: 2, name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", times: ["Evening"], notes: "At bedtime" },
    ],
    medicationAdherence: (() => {
      const days = getPast30Days()
      return {
        "1-Morning": pickTakenDates(days, 94),
        "2-Evening": pickTakenDates(days, 93),
      }
    })(),
    chatMessages: [
      { id: 1, sender: "doctor", text: "Lisa, your cardiac follow-up looks good. How's your energy level?", timestamp: "2:00 PM" },
      { id: 2, sender: "patient", text: "Much better! I've been walking 30 min daily now.", timestamp: "2:15 PM" },
      { id: 3, sender: "doctor", text: "Excellent progress. Keep it up.", timestamp: "2:20 PM" },
    ],
  },
};
