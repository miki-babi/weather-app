import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../assets/search.png';
import cloud_icon from '../assets/cloud.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState({
        humidity: '',
        windSpeed: '',
        cloudiness: '',
        temperature: '',
        location: '',
    });

    const api_key = "b7c6d72b4ad7dbd104da3c6c74de53df";

    const search = async () => {
        if (!city) return;

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
            const response = await fetch(url);
            const data = await response.json();

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                cloudiness: data.clouds.all,
                temperature: data.main.temp,
                location: `${data.name}, ${data.sys.country}`,
            });
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className='container'>
            <div className='top-bar'>
                <input
                    type="text"
                    className="cityInput"
                    placeholder='Search'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <div className='search_icon' onClick={search}>
                    <img src={search_icon} alt='Search'/>
                </div>
            </div>
            <div className="weather-image">
                <img src={cloud_icon} alt='Cloud'/>
            </div>
            <div className="weather-temp">{weatherData.temperature}°C</div>
            <div className="weather-location">{weatherData.location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} className='icon' alt='Humidity'/>
                    <div className="data">
                        <div className="humidity-percent">{weatherData.humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} className='icon' alt='Wind'/>
                    <div className="data">
                        <div className="wind-speed">{weatherData.windSpeed} km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
