const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Ollama API endpoint
const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

// Function to get clothing suggestions from Ollama
async function getClothingSuggestions(weatherData) {
    try {
        const prompt = `Based on the following weather data, suggest appropriate clothing items:
        Temperature: ${weatherData.temperature}°C
        Weather condition: ${weatherData.condition}
        Wind speed: ${weatherData.windSpeed} km/h
        Humidity: ${weatherData.humidity}%
        
        Please provide specific clothing suggestions that would be comfortable and appropriate for these conditions.`;

        const response = await axios.post(OLLAMA_API_URL, {
            model: "llama3.2:latest",
            prompt: prompt,
            stream: false
        });

        return response.data.response;
    } catch (error) {
        console.error('Error getting suggestions from Ollama:', error);
        throw error;
    }
}

// Endpoint to get clothing suggestions
app.post('/api/suggestions', async (req, res) => {
    try {
        const weatherData = req.body;
        const suggestions = await getClothingSuggestions(weatherData);
        res.json({ suggestions });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to get clothing suggestions' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 