import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link
import { FaTelegramPlane } from 'react-icons/fa';
import './App.css';
import { formatDateTime } from './utilityFunctions'; 

const colorOptions = [
    'lightblue', '#2F539B', '#00827F', '#348781', '#006A4E',
    '#99C68E', 'lightseagreen', '#77DD77'
];
const code = 10;

function WeatherApp() {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        async function fetchDataAndGenerateCards() {
            const apiKey = '18fc9643295e444acc923d3aa2cb3e23';
            try {
                const citiesResponse = await fetch('./cities.json');
                const citiesData = await citiesResponse.json();
                const cityCodes = citiesData.List.map(city => city.CityCode);
                const apiUrl = `https://api.openweathermap.org/data/2.5/group?id=${cityCodes.join(',')}&units=metric&appid=${apiKey}`;
                const cachedData = localStorage.getItem('weatherCache');

                if (cachedData) {
                    const { data, expiresAt } = JSON.parse(cachedData);
                    if (expiresAt > Date.now()) {
                        setWeatherData(data);
                        return;
                    }
                }

                const response = await fetch(apiUrl);
                const responseData = await response.json();
                const transformedData = responseData.list.map((cityData, index) => ({
                    CityCode: cityData.id,
                    CityName: cityData.name,
                    Temp: cityData.main.temp,
                    MinTemp: cityData.main.temp_min,
                    MaxTemp: cityData.main.temp_max,
                    Description: cityData.weather[0].description,
                    Icon: cityData.weather[0].icon,
                    Pressure: cityData.main.pressure,
                    Humidity: cityData.main.humidity,
                    Visibility: cityData.visibility,
                    Sunrise: cityData.sys.sunrise,
                    Sunset: cityData.sys.sunset,
                    country: cityData.sys.country,
                    WindSpeed: cityData.wind.speed,
                    WindDirection: cityData.wind.deg,
                    colorIndex: index % colorOptions.length
                }));

                const cacheData = {
                    data: transformedData,
                    expiresAt: Date.now() + 5 * 60 * 1000
                };
                localStorage.setItem('weatherCache', JSON.stringify(cacheData));

                setWeatherData(transformedData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        fetchDataAndGenerateCards();
    }, []);

    

    return (
        <div className="App">
            <div className="logo">
                <Row>
                    <Col>
                        <img src="logo.png" alt="Logo" width="200px" />
                    </Col>
                    <Col>
                        <h1>Weather App</h1>
                    </Col>
                </Row>
            </div>
            <br />

            <Container>
                <Row xs={1} md={2} lg={2} className="g-4" id="card-container">
                    {weatherData.map((details, index) => {

                        // Define the code variable here
                        return (
                            <Col key={index} className="mb-4" lg={6}>
                                <Link
                                    to={{
                                        pathname: `/SingleCard/${details.CityCode}` // Use backticks (`) for string interpolation
                                        // state: { code } // Pass the code variable as part of the state object
                                    }}
                                    className="link-style"
                                >
                                    {/* Your card content */}
                                    <div>
                                        <div className="top-section" style={{ backgroundColor: colorOptions[details.colorIndex] }}>
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <h2>{details.CityName}, {details.country}</h2>
                                                    <p>{formatDateTime(details.Sunrise)}</p>
                                                    <img src={`http://openweathermap.org/img/wn/${details.Icon}.png`} alt="Weather Icon" className="white-icon" />{details.Description}
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <h2>{details.Temp}°C</h2>
                                                    <p>Temp Max: {details.MaxTemp}°C</p>
                                                    <p>Temp Min: {details.MinTemp}°C</p>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="bottom-section">
                                            <Row>
                                                <Col xs={12} md={4}>
                                                    <p>Pressure: {details.Pressure}hpa</p>
                                                    <p>Humidity: {details.Humidity}%</p>
                                                    <p>Visibility: {details.Visibility}m</p>
                                                </Col>
                                                <Col xs={12} md={4}>
                                                    <p>&emsp;&emsp;<FaTelegramPlane /></p>
                                                    <p>{details.WindSpeed} m/s{details.WindDirection}°</p>
                                                </Col>
                                                <Col xs={12} md={4}>
                                                    <p>Sunrise: {new Date(details.Sunrise * 1000).toLocaleTimeString()}</p>
                                                    <p>Sunset: {new Date(details.Sunset * 1000).toLocaleTimeString()}</p>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
            <footer>
                <p className="centered-bg">Weather App &copy; 2023 Fidenz Technologies</p>
            </footer>
        </div>

    );

}

export default WeatherApp;
