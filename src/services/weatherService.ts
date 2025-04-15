
import axios from 'axios';
import { WeatherData, ForecastData } from '@/types/weather';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (city: string, apiKey: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getForecast = async (city: string, apiKey: string): Promise<ForecastData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
        cnt: 40 // 5-day forecast with 3-hour steps
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};
