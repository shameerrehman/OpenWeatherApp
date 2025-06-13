'use client'

import { useState, useEffect } from "react"
import WeatherCard from "@/components/WeatherCard"

export default function Home() {
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load cities from JSON file and filter
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
        setError("City list failed to load")
      }
    }

    loadCities()
  }, [])

  // Fetch weather using OpenWeather API baed on ctiy ID
  const fetchWeather = async () => {
    if (!selectedCity) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${selectedCity.id}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
      )

      if (!res.ok) throw new Error("City not found")

      const data = await res.json()
      setWeather(data)
    } catch (err) {
      setWeather(null)
      setError(err.message)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Open Weather App</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex gap-2 mb-6">
        <select
          className="p-2 rounded border border-gray-300 w-64"
          onChange={(e) =>
            setSelectedCity(
              cities.find(city => city.id === parseInt(e.target.value))
            )
          }
          value={selectedCity?.id || ""}
        >
          <option value="" disabled>
            Select a city
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}, {city.country}
            </option>
          ))}
        </select>

        <button
          onClick={fetchWeather}
          disabled={!selectedCity}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Get Weather
        </button>
      </div>

      {loading && <p>Loading weather data...</p>}

      {weather && <WeatherCard weather={weather} />}

    </main>
  )
}