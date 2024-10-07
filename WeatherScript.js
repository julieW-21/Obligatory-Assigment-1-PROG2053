/*JavaScript that displays current weather for a specified 
 location using Open-Meteo API.*/

const locations = [ 										//The locations chosen to display. 
	{name: "Buenos Aires", latitude: -34.6131, longitude: -58.3772 },
	{name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
	{name: "Lillehammer", latitude: 61.1151, longitude: 10.4663 },
	{name: "Nairobi", latitude: -1.2833, longitude: 36.8167 },
	{name: "Sydney", latitude: -33.8678, longitude: 151.2073 },
	{name: "Bangkok", latitude: 13.754, longitude: 100.5014 },
	

];

/*Fetches weather data for each city in the locations array. 
  Calls the display function.*/
async function fetchWeather() {
	for (const city of locations) {
		try {
			const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}
											&longitude=${city.longitude}&current_weather=true&timezone=auto`);
			const data = await response.json();
			displayWeather(city.name, data.current_weather);  //Calls the display function and passes the arguments.
		} catch (error) {									  //If it can't fetch the data.
			console.error(`Error fetching weather`, error);
		}
	}
}

//Displays the data using the parameters: cityName and its weatherData.
function displayWeather(cityName, weatherData) {
	const weatherbox = document.getElementById(cityName.toLowerCase()); //Turns name to its id (lowercase).
	if (weatherbox) {										//If true (exists).
																			//Puts the data into fitting variables.
		const temperature = weatherData.temperature;					
		const condition = weatherCodetoLetters(weatherData.weathercode); //Changes weather code to readable words.

																			//Selects where to display the data
		weatherbox.querySelector('.temp').textContent = `Temperature (°C): ${temperature.toFixed(1)}`; //Only 1 decimal.
		weatherbox.querySelector('.condition').textContent = `Weather: ${condition}`;
	}
}

//Changes weather code to readable words.
function weatherCodetoLetters(code) {
	const weatherCodeConditions = {
		0:	'Clear sky',
		1:  'Mainly clear',
		2:  'Partly cloudy',
		3:	'Overcast',
		45: 'Fog',
		48:	'Depositing rime fog',
		51: 'Drizzle: Light',
		53: 'Drizzle: Moderate',
		55:	'Drizzel: Dense',
		56: 'Freezing Drizzle: Light',
		57:	'Freezing Drizzle: Dense',
		61: 'Rain: Slight',
		63: 'Rain: Moderate',
		65:	'Rain: Heavy',
		66: 'Freezing Rain: Light',
		67:	'Freezing Rain: heavy',
		71: 'Snow fall: Slight',
		73: 'Snow fall: Moderate',
		75:	'Snow fall: Heavy',
		77:	'Snow grains',
		80: 'Rain showers: Slight',
		81: 'Rain showers: Moderate',
		82:	'Rain showers: Violent',
		85: 'Snow showers: Slight',
		86:	'Snow showers Heavy',
		95: 'Thunderstorm: Slight or moderate',
		96: 'Thunderstorm with slight hail',
		99:	'Thunderstorm with heavy hail'
	};

	return weatherCodeConditions[code];
}

//Fetches the data regularly every 60 seconds so it always current.
fetchWeather();
setInterval(fetchWeather, 60000);