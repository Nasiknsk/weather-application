import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import { fetchWeatherData } from '../../utils/apiHelper';
import { colorOptions } from '../../utils/constants';
import { formatDateTime } from '../../utils/utilityFunctions';
import Header from '../common/Header';
import Footer from '../common/Footer';

function SingleCard() {
    const { CityCode, index } = useParams();
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchWeatherData(CityCode);
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                
            }
        };

        fetchData();
    }, [CityCode]);

    const renderCard = () => {
        if (!weatherData) {
            return <div>Loading...</div>;
        }

        const cityWeather = weatherData.find(city => city.CityCode === Number(CityCode));
        if (!cityWeather) {
            return <div>City data not found...</div>;
        }

        //const colorIndex = cityWeather.colorIndex % colorOptions.length;

        return (
            <>
                <Header />
                <br />
                <Container>
                    <Row>
                        <Col xs={12} md={6}>
                            <div className="card">
                                <div className={`top-section color-${index}`}>
                                    <button className="custom-button" onClick={() => window.history.back()}>
                                        <FaArrowLeft />
                                    </button>
                                    <h2>{cityWeather.CityName}, {cityWeather.country}</h2>
                                    <p>{formatDateTime(cityWeather.Sunrise)}</p>
                                    <Row>
                                        <Col xs={6} md={6}>
                                            <img src={`http://openweathermap.org/img/wn/${cityWeather.Icon}.png`} alt="Weather Icon" className="white-icon" />
                                        </Col>
                                        <Col xs={6} md={6}>
                                            <h2>{cityWeather.Temp}°C</h2>
                                            <p>Temp Max: {cityWeather.MaxTemp}°C</p>
                                            <p>Temp Min: {cityWeather.MinTemp}°C</p>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="bottom-section">
                                    <Row>
                                        <Col xs={4} md={4}>
                                            <p>Pressure: {cityWeather.Pressure}hpa</p>
                                            <p>Humidity: {cityWeather.Humidity}%</p>
                                            {/* Add more bottom column data here */}
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <p>&emsp;&emsp;<FaTelegramPlane /></p>
                                            <p>{cityWeather.WindSpeed} m/s {cityWeather.WindDirection}°</p>
                                            {/* Add more bottom column data here */}
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <p>Sunrise: {formatDateTime(cityWeather.Sunrise)}</p>
                                            <p>Sunset: {formatDateTime(cityWeather.Sunset)}</p>
                                            {/* Add more bottom column data here */}
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <br />
                <Footer />
            </>
        );
    };

    return (
        <div id="card-container">
            {renderCard()}
        </div>
    );
}

export default SingleCard;