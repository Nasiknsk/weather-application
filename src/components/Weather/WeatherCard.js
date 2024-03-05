import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaTelegramPlane } from 'react-icons/fa';
import { formatDateTime,formatTime } from '../../utils/utilityFunctions';


function WeatherCard({ details, colorIndex }) {
    return (
        <div>
            <div className={`top-section color-${colorIndex}`}>
                <Row>
                    <Col xs={6} md={6}>
                        <h2>{details.CityName}, {details.country}</h2>
                        <p>{formatDateTime(details.Sunrise)}</p>
                        <img src={`http://openweathermap.org/img/wn/${details.Icon}.png`} alt="Weather Icon" className="white-icon" />{details.Description}
                    </Col>
                    <Col xs={6} md={6}>
                        <h2>{details.Temp}°C</h2>
                        <p>Temp Max: {details.MaxTemp}°C</p>
                        <p>Temp Min: {details.MinTemp}°C</p>
                    </Col>
                </Row>
            </div>
            <div className="bottom-section">
                <Row>
                    <Col xs={4} md={4}>
                        <p>Pressure: {details.Pressure}hpa</p>
                        <p>Humidity: {details.Humidity}%</p>
                        <p>Visibility: {details.Visibility}m</p>
                    </Col>
                    <Col xs={4} md={4}>
                        <p>&emsp;&emsp;<FaTelegramPlane /></p>
                        <p>{details.WindSpeed} m/s{details.WindDirection}°</p>
                    </Col>
                    <Col xs={4} md={4}>
                        <p>Sunrise: {formatTime(details.Sunrise)}</p>
                        <p>Sunset: {formatTime(details.Sunset)}</p>
                    </Col>
                </Row>
            </div>
        </div>
    );
}


export default WeatherCard;
