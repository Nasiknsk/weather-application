import { colorOptions, LOCAL_STORAGE_TIMESTAMP_KEY, LOCAL_STORAGE_WEATHER_DATA_KEY, CITY_JSON_URL, API_URL } from './constants';
import {isCacheValid} from './utilityFunctions';

export const fetchWeatherData = async () => {
    try {
        const cachedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_WEATHER_DATA_KEY));
        const cachedTimestamp = parseInt(localStorage.getItem(LOCAL_STORAGE_TIMESTAMP_KEY), 10);
       

        if (isCacheValid(cachedData, cachedTimestamp)) {
            console.log("Using cached data");
            const cityDetails = cachedData.map((cityData, index) => transformCityData(cityData, index));
            return cityDetails;
        } else {
            console.log("No cached data available or data expired.");
            localStorage.removeItem(LOCAL_STORAGE_WEATHER_DATA_KEY);
            localStorage.removeItem(LOCAL_STORAGE_TIMESTAMP_KEY);
        }

        const citiesResponse = await fetch(CITY_JSON_URL);
        if (!citiesResponse.ok) {
            throw new Error('Failed to fetch city data');
        }

        const citiesData = await citiesResponse.json();
        if (!citiesData || !citiesData.List || !Array.isArray(citiesData.List)) {
            throw new Error('Invalid city data format');
        }

        const cityCodes = citiesData.List.map(city => city.CityCode);
        const API_KEY = process.env.REACT_APP_API_KEY;
        const apiUrl = `${API_URL}?id=${cityCodes.join(',')}&units=metric&appid=${API_KEY}`;

        const response = await fetch(apiUrl);
        const responseData = await response.json();

        localStorage.setItem(LOCAL_STORAGE_WEATHER_DATA_KEY, JSON.stringify(responseData.list));
        localStorage.setItem(LOCAL_STORAGE_TIMESTAMP_KEY, Date.now());

        const transformedData = responseData.list.map((cityData, index) => transformCityData(cityData, index));

        return transformedData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Error fetching weather data');
    }
};

const transformCityData = (cityData, index) => ({
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
});



export default {
    fetchWeatherData,
};
