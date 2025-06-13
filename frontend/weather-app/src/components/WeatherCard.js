import { Card, CardContent, Typography, Grid, Paper } from '@mui/material';

export default function WeatherCard({ weather, isMetric }) {
  if (!weather) return null;

  const getUnitSymbol = (type) => {
    if (type === 'temperature') return isMetric ? '°C' : '°F';
    if (type === 'speed') return isMetric ? 'm/s' : 'mph';
    return '';
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          {weather.name}
        </Typography>
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
        <Typography align="center" color="text.secondary" gutterBottom>
          {weather.weather[0].description}
        </Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2">Feels Like</Typography>
              <Typography>{Math.round(weather.main.feels_like)}{getUnitSymbol('temperature')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2">Humidity</Typography>
              <Typography>{weather.main.humidity}%</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2">Wind Speed</Typography>
              <Typography>{Math.round(weather.wind.speed)} {getUnitSymbol('speed')}</Typography>
            </Paper>
          </Grid>
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