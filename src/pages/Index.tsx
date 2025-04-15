
import { useState, useEffect } from 'react';
import WeatherSearch from '@/components/WeatherSearch';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastCard from '@/components/ForecastCard';
import LoadingAnimation from '@/components/LoadingAnimation';
import WeatherPlaceholder from '@/components/WeatherPlaceholder';
import { getWeather, getForecast } from '@/services/weatherService';
import { WeatherData, ForecastData } from '@/types/weather';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyEntered, setApiKeyEntered] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [lastSearchedCity, setLastSearchedCity] = useState<string | null>(null);

  // Check localStorage for API key on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('weatherApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setApiKeyEntered(true);
      
      // Optionally load last searched city
      const lastCity = localStorage.getItem('lastSearchedCity');
      if (lastCity) {
        setLastSearchedCity(lastCity);
        handleSearch(lastCity, savedApiKey);
      }
    }
  }, []);

  const handleSearch = async (city: string, keyToUse = apiKey) => {
    if (!keyToUse) {
      setError('Please enter your OpenWeatherMap API key first');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Save the last searched city
      localStorage.setItem('lastSearchedCity', city);
      setLastSearchedCity(city);
      
      // Fetch weather data
      const weather = await getWeather(city, keyToUse);
      const forecast = await getForecast(city, keyToUse);
      
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err: any) {
      console.error('Error fetching weather data:', err);
      if (err.response && err.response.status === 401) {
        setError('Invalid API key. Please check your OpenWeatherMap API key.');
      } else if (err.response && err.response.status === 404) {
        setError(`City "${city}" not found. Please check the spelling and try again.`);
      } else {
        setError('Failed to fetch weather data. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('weatherApiKey', apiKey.trim());
      setApiKeyEntered(true);
      
      // If there was a last searched city, search for it again
      if (lastSearchedCity) {
        handleSearch(lastSearchedCity, apiKey.trim());
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 flex flex-col p-4 sm:p-6">
      <div className="max-w-4xl w-full mx-auto flex-1">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weather Forecast</h1>
          <p className="text-white/80">Search for a city to get the current weather and forecast</p>
        </div>

        {!apiKeyEntered ? (
          <Card className="mb-6 bg-white/10 backdrop-blur-md border-none">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Enter Your OpenWeatherMap API Key</h2>
              <p className="text-white/80 mb-4">
                Get your free API key by signing up at{" "}
                <a 
                  href="https://openweathermap.org/api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-200 underline"
                >
                  OpenWeatherMap.org
                </a>
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="flex-1 bg-white/20 text-white placeholder:text-white/50 border-none"
                />
                <Button
                  onClick={handleSaveApiKey}
                  disabled={!apiKey.trim()}
                  className="bg-white/20 hover:bg-white/30 text-white sm:w-auto"
                >
                  Save Key
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <WeatherSearch onSearch={handleSearch} isLoading={loading} />
        )}

        {error && (
          <div className="bg-red-500/80 text-white p-4 rounded-lg mt-4 backdrop-blur-sm">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center h-64 relative">
            <LoadingAnimation />
          </div>
        )}

        {!loading && weatherData && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <CurrentWeather data={weatherData} />
            
            {forecastData && (
              <ForecastCard data={forecastData} />
            )}
          </div>
        )}
        
        {!loading && !weatherData && !error && apiKeyEntered && (
          <div className="mt-12">
            <WeatherPlaceholder onExampleSearch={handleSearch} />
          </div>
        )}
      </div>
      
      <footer className="mt-auto pt-8 text-center text-white/60 text-sm">
        <p>Data provided by OpenWeatherMap</p>
      </footer>
    </div>
  );
};

export default Index;
