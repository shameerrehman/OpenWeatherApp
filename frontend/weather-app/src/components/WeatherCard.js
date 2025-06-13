import { Card, CardContent, Typography, Grid, Paper } from '@mui/material';

export default function WeatherCard({ weather, isMetric }) {
  // If no weather data is provided, render nothing
  if (!weather) return null;

  // Helper function to get the correct unit symbol based on the type and isMetric flag
  const getUnitSymbol = (type) => {
    if (type === 'temperature') return isMetric ? '°C' : '°F';
    if (type === 'speed') return isMetric ? 'm/s' : 'mph';
    return '';
  };

  return (
    // Main card container for the weather information
    <Card>
      <CardContent>
        {/* City name */}
        <Typography variant="h5" align="center" gutterBottom>
          {weather.name}
        </Typography>

        {/* Weather icon and temperature */}
        <Grid container justifyContent="center" alignItems="center" mb={2}>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            width={48}
            height={48}
          />
          <Typography variant="h4" component="span" ml={1}>
            {Math.round(weather.main.temp)}{getUnitSymbol('temperature')}
          </Typography>
        </Grid>

        {/* Weather description */}
        <Typography align="center" color="text.secondary" gutterBottom>
          {weather.weather[0].description}
        </Typography>

        {/* Weather details*/}
        <Grid container spacing={2} mt={1}>
          {/* Feels Like */}
          <Grid item xs={6}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2">Feels Like</Typography>
              <Typography>{Math.round(weather.main.feels_like)}{getUnitSymbol('temperature')}</Typography>
            </Paper>
          </Grid>
          {/* Humidity */}
          <Grid item xs={6}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2">Humidity</Typography>
              <Typography>{weather.main.humidity}%</Typography>
            </Paper>
          </Grid>
          {/* Wind Speed */}
          <Grid item xs={6}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2">Wind Speed</Typography>
              <Typography>{Math.round(weather.wind.speed)} {getUnitSymbol('speed')}</Typography>
            </Paper>
          </Grid>
          {/* Pressure */}
          <Grid item xs={6}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2">Pressure</Typography>
              <Typography>{weather.main.pressure} hPa</Typography>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
} 