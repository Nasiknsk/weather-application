import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';
import logo from './logo.png';
import { formatDateTime, formatTime } from './utilityFunctions'; 

const colorOptions = [
    'lightblue', '#2F539B', '#00827F', '#348781', '#006A4E',
    '#99C68E', 'lightseagreen', '#77DD77'
];

function SingleCard() {
    const { CityCode } = useParams();
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = '18fc9643295e444acc923d3aa2cb3e23';
                const response = await fetch(`https://api.openweathermap.org/data/2.5/group?id=${CityCode}&units=metric&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                if (data.list && data.list.length > 0) {
                    setWeatherData(data.list[0]); // Assuming the first item contains the desired weather data
                } else {
                    throw new Error('No weather data available');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        return () => {
            // Cleanup code if needed
        };
    }, [CityCode]);

    const renderCard = () => {
        if (!weatherData) {
            return <div>Loading...</div>;
        }

        const colorIndex = Math.floor(Math.random() * colorOptions.length);
        return (
            <>
               <div className="logo">
                <Row>
                    <Col>
                    <img src={logo} alt="Logo" width="200px" />

                    </Col>
                    <Col>
                        <h1>Weather App</h1>
                    </Col>
                </Row>
            </div>
            <br />
             <div className="col-md-6">
                <div className="card">
                    <div className="top-section" style={{ backgroundColor: colorOptions[colorIndex] }}>

                        <button style={{ position: 'absolute', top: 0, left: 0, background: 'none', border: 'none' }} onClick={() => window.history.back()}>
                            <FaArrowLeft />
                        </button>

                        <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                        <p>{formatDateTime(weatherData.sys.sunrise)}</p>
                        <div className="row">
                            <div className="col-md-6">
                                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather Icon" className="white-icon" />
                            </div>
                            <div className="col-md-6">
                                <h2>{weatherData.main.temp}°C</h2>
                                <p>Temp Max: {weatherData.main.temp_max}°C</p>
                                <p>Temp Min: {weatherData.main.temp_min}°C</p>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-section">
                        <div className="row">
                            <div className="col-md-4">
                                <p>Pressure: {weatherData.main.pressure}hpa</p>
                                <p>Humidity: {weatherData.main.humidity}%</p>
                                {/* Add more bottom column data here */}
                            </div>
                            <div className="col-md-4">
                                <p>&emsp;&emsp;<FaTelegramPlane /></p>
                                <p>{weatherData.wind.speed} m/s {weatherData.wind.deg}°</p>
                                {/* Add more bottom column data here */}
                            </div>
                            <div className="col-md-4">
                                <p>Sunrise: {formatTime(weatherData.sys.sunrise)}</p>
                                <p>Sunset: {formatTime(weatherData.sys.sunset)}</p>
                                {/* Add more bottom column data here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    };


    return (
        <div id="card-container" className="row">
            {renderCard()}
        </div>
    );
}

export default SingleCard;
