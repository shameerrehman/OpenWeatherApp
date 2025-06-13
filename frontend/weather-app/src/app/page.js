'use client'

import { useState, useEffect } from "react"
import WeatherCard from "@/components/WeatherCard"
import UnitToggle from "@/components/UnitToggle"
import ClothingSuggestions from "@/components/ClothingSuggestions"
import { 
  Container, 
  Typography, 
  Select, 
  MenuItem, 
  Button, 
  Box,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress
} from '@mui/material'
import CloudIcon from '@mui/icons-material/Cloud';

export default function Home() {
  // State for city list, selected city, weather data, loading, error, and unit toggle
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isMetric, setIsMetric] = useState(true)
  // New state for clothing suggestions
  const [suggestions, setSuggestions] = useState(null)
  const [suggestionsLoading, setSuggestionsLoading] = useState(false)
  const [suggestionsError, setSuggestionsError] = useState(null)

  // Load cities from JSON file and filter for Canadian cities
  useEffect(() => {
    const loadCities = async () => {
      try {
        const res = await fetch("/city.list.min.json")
        const data = await res.json()
        // Only keep cities in Canada (CA)
        const filtered = data.filter(city => city.country === "CA")
        setCities(filtered)
      } catch (err) {
        setError("City list failed to load")
      }
    }
    loadCities()
  }, [])

  // Fetch clothing suggestions based on weather data
  const fetchClothingSuggestions = async (weatherData) => {
    setSuggestionsLoading(true)
    setSuggestionsError(null)
    try {
      const res = await fetch('http://localhost:3001/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temperature: weatherData.main.temp,
          condition: weatherData.weather[0].main,
          windSpeed: weatherData.wind.speed,
          humidity: weatherData.main.humidity
        })
      })
      
      if (!res.ok) throw new Error('Failed to get clothing suggestions')
      const data = await res.json()
      setSuggestions(data.suggestions)
    } catch (err) {
      setSuggestionsError(err.message)
    } finally {
      setSuggestionsLoading(false)
    }
  }

  // Fetch weather data for the selected city and unit
  const fetchWeather = async () => {
    if (!selectedCity) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${selectedCity.id}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=${isMetric ? 'metric' : 'imperial'}`
      )
      if (!res.ok) throw new Error("City not found")
      const data = await res.json()
      setWeather(data)
      // Fetch clothing suggestions when weather data is available
      await fetchClothingSuggestions(data)
    } catch (err) {
      setWeather(null)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Refetch weather when the unit system changes
  useEffect(() => {
    if (selectedCity) {
      fetchWeather()
    }
  }, [isMetric])

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'rgba(255,255,255,0.7)', // semi-transparent white
          borderRadius: 4,
          boxShadow: 3,
          p: 4,
          my: 6, // Adding vertical margin
          backdropFilter: 'blur(4px)', // frosted glass effect
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        {/* App title */}
        <Typography variant="h3" component="h1">
          Open Weather App
        </Typography>

        {/* Error alert if something goes wrong */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* City selector and Get Weather button */}
        <Box display="flex" gap={2} width="100%" alignItems="center">
          <FormControl fullWidth>
            <InputLabel>Select a city</InputLabel>
            <Select
              value={selectedCity?.id || ""}
              onChange={e =>
                setSelectedCity(
                  cities.find(city => city.id === parseInt(e.target.value))
                )
              }
              label="Select a city"
            >
              {cities.map(city => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}, {city.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={fetchWeather}
            disabled={!selectedCity}
            startIcon={<CloudIcon />}
          >
            Get Weather
          </Button>
        </Box>

        {/* Unit toggle for metric/imperial */}
        <UnitToggle isMetric={isMetric} onToggle={() => setIsMetric(!isMetric)} />

        {/* Loading spinner while fetching data */}
        {loading && <CircularProgress />}

        {/* Weather card display */}
        {weather && <WeatherCard weather={weather} isMetric={isMetric} />}

        {/* Clothing suggestions */}
        <ClothingSuggestions 
          suggestions={suggestions}
          loading={suggestionsLoading}
          error={suggestionsError}
        />
      </Box>
    </Container>
  )
}