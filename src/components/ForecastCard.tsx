
import { Card, CardContent } from '@/components/ui/card';
import { ForecastData } from '@/types/weather';
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Sun } from 'lucide-react';

interface ForecastCardProps {
  data: ForecastData;
}

const ForecastCard = ({ data }: ForecastCardProps) => {
  const getWeatherIcon = (iconCode: string) => {
    switch (iconCode.substring(0, 2)) {
      case '01': return <Sun className="h-8 w-8 text-yellow-400" />;
      case '02':
      case '03':
      case '04': return <Cloud className="h-8 w-8 text-gray-200" />;
      case '09':
      case '10': return <CloudRain className="h-8 w-8 text-blue-300" />;
      case '11': return <CloudLightning className="h-8 w-8 text-yellow-300" />;
      case '13': return <CloudSnow className="h-8 w-8 text-white" />;
      case '50': return <CloudDrizzle className="h-8 w-8 text-gray-300" />;
      default: return <Sun className="h-8 w-8 text-yellow-400" />;
    }
  };

  // Group forecast data by day
  const groupedForecast = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof data.list>);

  // Get daily forecast (take the middle entry for each day)
  const dailyForecast = Object.keys(groupedForecast).map(date => {
    const forecasts = groupedForecast[date];
    const midday = forecasts.find(f => 
      new Date(f.dt * 1000).getHours() >= 12 && 
      new Date(f.dt * 1000).getHours() <= 15
    ) || forecasts[Math.floor(forecasts.length / 2)];
    return midday;
  }).slice(0, 5); // Limit to 5 days

  const formatDay = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <Card className="w-full bg-white/10 backdrop-blur-md shadow-lg">
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold text-white mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {dailyForecast.map((forecast, index) => (
            <div key={index} className="flex flex-col items-center p-2 text-white">
              <p className="text-sm font-medium">{formatDay(forecast.dt)}</p>
              <div className="my-2">
                {getWeatherIcon(forecast.weather[0].icon)}
              </div>
              <p className="text-lg font-bold">{Math.round(forecast.main.temp)}°C</p>
              <p className="text-xs capitalize truncate">{forecast.weather[0].description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
