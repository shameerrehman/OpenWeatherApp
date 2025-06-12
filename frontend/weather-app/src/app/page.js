'use client'

import { useState, useEffect } from "react"

export default function Home() {
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState("")

  useEffect(() => {
    const loadCities = async () => {
      try {
        const res = await fetch("/city.list.min.json")
        const data = await res.json()

        // Filter for CA cities only due to large file size
        const filtered = data.filter(city =>
          city.country === "CA"
        )
        
        setCities(filtered)
      } catch (err) {
        console.error("Failed to load city list", err)
      }
    }

    loadCities()
  }, [])

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
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}, {city.country}
            </option>
          ))}
        </select>

        <button
          onClick={() => console.log("City selected:", selectedCity)}
          disabled={!selectedCity}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Get Weather
        </button>
      </div>
    </main>
  )
}
