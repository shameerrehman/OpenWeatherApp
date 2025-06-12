'use client'

import { useState } from "react"

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("")

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Open Weather App</h1>

      <div className="flex gap-2 mb-6">
        <select
          className="p-2 rounded border border-gray-300 w-64"
          onChange={(e) => setSelectedCity(e.target.value)}
          value={selectedCity}
        >
          <option value="" disabled>
            Select a city
          </option>
          <option value="Toronto">Toronto, CA</option>
          <option value="Vancouver">Vancouver, CA</option>
          <option value="New York">New York, US</option>
          <option value="Chicago">Chicago, US</option>
        </select>

        <button
          onClick={() => console.log("Fetch weather for", selectedCity)}
          disabled={!selectedCity}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Get Weather
        </button>
      </div>
    </main>
  )
}
