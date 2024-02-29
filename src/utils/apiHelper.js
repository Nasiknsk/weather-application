import { colorOptions } from './constants';
import citiesData from './cities.json';

export const fetchWeatherData = async () => {
    try {
        //fetch datas from cities.json
        const citiesResponse = await fetch('/cities.json');
        if (!citiesResponse.ok) {
            throw new Error('Failed to fetch city data');
        }

        const citiesData = await citiesResponse.json();
        if (!citiesData || !citiesData.List || !Array.isArray(citiesData.List)) {
            throw new Error('Invalid city data format');
        }

        const cityCodes = citiesData.List.map(city => city.CityCode);
        
        const API_KEY = process.env.REACT_APP_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/group?id=${cityCodes.join(',')}&units=metric&appid=${API_KEY}`;
        console.log('API_KEY:', process.env.REACT_APP_API_KEY);
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        console.log("responseData");
        console.log(responseData);

        // Store the fetched data in browser's cache (localStorage)
        localStorage.setItem('weatherData', JSON.stringify(responseData));



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
        return transformedData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Error fetching weather data');
    }
};

export default {
    fetchWeatherData,
};
