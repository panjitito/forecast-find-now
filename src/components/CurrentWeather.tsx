
import { Card, CardContent } from '@/components/ui/card';
import { WeatherData } from '@/types/weather';
import { 
  Cloud, 
  CloudDrizzle, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  Thermometer, 
  Wind, 
  Droplets
} from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const getWeatherIcon = (iconCode: string) => {
    switch (iconCode.substring(0, 2)) {
      case '01': return <Sun className="h-16 w-16 text-yellow-400" />;
      case '02':
      case '03':
      case '04': return <Cloud className="h-16 w-16 text-gray-200" />;
      case '09':
      case '10': return <CloudRain className="h-16 w-16 text-blue-300" />;
      case '11': return <CloudLightning className="h-16 w-16 text-yellow-300" />;
      case '13': return <CloudSnow className="h-16 w-16 text-white" />;
      case '50': return <CloudDrizzle className="h-16 w-16 text-gray-300" />;
      default: return <Sun className="h-16 w-16 text-yellow-400" />;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBackgroundClass = (iconCode: string) => {
    switch (iconCode.substring(0, 2)) {
      case '01': return 'from-blue-500 to-sky-300'; // Clear sky
      case '02': return 'from-blue-400 to-sky-300'; // Few clouds
      case '03':
      case '04': return 'from-blue-300 to-gray-300'; // Cloudy
      case '09':
      case '10': return 'from-blue-600 to-gray-500'; // Rain
      case '11': return 'from-gray-700 to-gray-900'; // Thunderstorm
      case '13': return 'from-blue-100 to-gray-200'; // Snow
      case '50': return 'from-gray-400 to-gray-500'; // Mist
      default: return 'from-blue-500 to-sky-300';
    }
  };

  return (
    <Card className={`w-full overflow-hidden shadow-xl bg-gradient-to-br ${getBackgroundClass(data.weather[0].icon)}`}>
      <CardContent className="p-6 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-0">
          <div>
            <h2 className="text-3xl font-bold">{data.name}, {data.sys.country}</h2>
            <p className="text-sm opacity-80">{formatDate(data.dt)}</p>
            <div className="mt-2">
              <p className="text-lg capitalize">{data.weather[0].description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              {getWeatherIcon(data.weather[0].icon)}
            </div>
            <p className="text-5xl font-bold mt-2">{Math.round(data.main.temp)}°C</p>
            <p className="text-sm">Feels like: {Math.round(data.main.feels_like)}°C</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6">
          <div className="flex flex-col items-center bg-white/20 backdrop-blur-sm p-3 rounded-lg">
            <Thermometer className="h-6 w-6 mb-1" />
            <span className="text-xs">Min/Max</span>
            <span className="font-semibold">{Math.round(data.main.temp_min)}°/{Math.round(data.main.temp_max)}°</span>
          </div>
          <div className="flex flex-col items-center bg-white/20 backdrop-blur-sm p-3 rounded-lg">
            <Wind className="h-6 w-6 mb-1" />
            <span className="text-xs">Wind</span>
            <span className="font-semibold">{Math.round(data.wind.speed)} m/s</span>
          </div>
          <div className="flex flex-col items-center bg-white/20 backdrop-blur-sm p-3 rounded-lg">
            <Droplets className="h-6 w-6 mb-1" />
            <span className="text-xs">Humidity</span>
            <span className="font-semibold">{data.main.humidity}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
