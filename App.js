// Main App files ..
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';
import Forecast from "./components/forecast/forecast";

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);

  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {

    // console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");
    
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);  
    
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    // api.openweathermap.org/data/2.5/?lat={lat}&lon={lon}&appid={API key}

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        
        const forcastResponse = await response[1].json();

        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setForecast({city: searchData.label, ...forcastResponse});

      })

      // .catch((err) => console.log(err));
      .catch(console.log);

  };
  
  // console.log(currentWeather);
  // console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      {/* <Forecast /> */}

    </div>
  );
}

export default App;
