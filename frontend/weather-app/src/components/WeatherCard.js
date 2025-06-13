export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="bg-white p-6 rounded shadow-md text-center">
      <h2 className="text-2xl font-semibold">{weather.name}</h2>
      <div className="flex items-center justify-center mb-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="w-16 h-16"
        />
        <span className="text-3xl font-bold ml-2">
          {Math.round(weather.main.temp)}°C
        </span>
      </div>
      <p className="text-xl text-gray-600 capitalize mb-4">
        {weather.weather[0].description}
      </p>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 p-3 rounded">
          <p className="font-semibold">Feels Like</p>
          <p>{Math.round(weather.main.feels_like)}°C</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="font-semibold">Humidity</p>
          <p>{weather.main.humidity}%</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="font-semibold">Wind Speed</p>
          <p>{weather.wind.speed} m/s</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="font-semibold">Pressure</p>
          <p>{weather.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
} 