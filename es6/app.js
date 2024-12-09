// Define the OpenWeatherMap API key and URL
const apiKey = '18edcf34c5d0eb6bb60e843bf9d0be31'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Function to fetch weather data
const fetchWeatherData = async (city) => {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&units=metric&cnt=5&appid=${apiKey}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

// Function to plot the weather data in a graph
const plotWeatherData = (data) => {
    // Extract the temperature data from the API response
    const labels = data.list.map(item => new Date(item.dt * 1000).toLocaleTimeString());
    const temperatures = data.list.map(item => item.main.temp);

    // Create the chart
    const ctx = document.getElementById('weatherChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { 
                    type: 'category', 
                    labels: labels 
                },
                y: {
                    min: Math.min(...temperatures) - 1,
                    max: Math.max(...temperatures) + 1,
                    title: { text: 'Temperature (°C)', display: true }
                }
            }
        }
    });
};

// Event listener for the fetch weather button
document.getElementById('fetchWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    if (city) {
        try {
            const weatherData = await fetchWeatherData(city);
            plotWeatherData(weatherData);
        } catch (error) {
            alert("Failed to fetch weather data.");
        }
    } else {
        alert("Please enter a city name.");
    }
});