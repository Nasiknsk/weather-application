import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WeatherCard from './WeatherCard'; // Import WeatherCard component
import { fetchWeatherData } from '../../utils/apiHelper'; // Import fetchWeatherData function
import Header from './../common/Header';
import Footer from './../common/Footer';

function Weather() {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchWeatherData();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <br />
            <div>
                <Container>
                    <Row xs={12} md={6} lg={6} className="g-4" id="card-container">
                        {weatherData.map((details, index) => (
                            <Col key={index} className="mb-4" lg={6}>
                                <Link
                                    to={`/SingleCard/${details.CityCode}/${index}`}
                                    className="link-style"
                                >
                                    <WeatherCard details={details} colorIndex={details.colorIndex} />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Weather;
