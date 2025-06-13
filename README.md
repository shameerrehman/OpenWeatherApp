# Weather App with AI Clothing Suggestions

A modern weather application that not only shows weather data but also provides AI-powered clothing suggestions based on the current weather conditions. The app uses OpenWeather API for weather data and Ollama for generating personalized clothing recommendations.

## Features

- Real-time weather data for Canadian cities
- Temperature display in both Celsius and Fahrenheit
- AI-powered clothing suggestions based on:
  - Temperature
  - Weather conditions
  - Wind speed
  - Humidity
- Modern, responsive UI with Material-UI components
- Frosted glass effect design

## Tech Stack

### Frontend
- Next.js 14
- React
- Material-UI (MUI)
- React Markdown
- Axios

### Backend
- Node.js
- Express.js
- Ollama (Local AI model)
- Axios

## Prerequisites

Before running the application, make sure you have:

1. Node.js installed (v16 or higher)
2. Ollama installed and running locally
3. An OpenWeather API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd OpenWeatherApp
```

2. Install frontend dependencies:
```bash
cd frontend/weather-app
npm install
```

3. Install backend dependencies:
```bash
cd ../../backend
npm install
```

4. Create a `.env` file in the frontend directory:
```bash
cd ../frontend/weather-app
echo "NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here" > .env.local
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:3001

2. In a new terminal, start the frontend:
```bash
cd frontend/weather-app
npm run dev
```
The frontend will run on http://localhost:3000

3. Make sure Ollama is running locally (default port: 11434)

## Usage

1. Open http://localhost:3000 in your browser
2. Select a Canadian city from the dropdown
3. Click "Get Weather" to fetch current weather data
4. View the weather information and AI-generated clothing suggestions
5. Toggle between Celsius and Fahrenheit using the unit toggle

## Project Structure

```
OpenWeatherApp/
├── frontend/
│   └── weather-app/
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   └── public/
│       └── package.json
├── backend/
│   ├── server.js
│   └── package.json
└── README.md
```

## API Endpoints

### Backend
- `POST /api/suggestions`: Get clothing suggestions based on weather data
- `GET /health`: Health check endpoint

### Frontend
- Weather data is fetched from OpenWeather API
- Clothing suggestions are generated using Ollama

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details. 