
import { CloudSun, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeatherPlaceholderProps {
  onExampleSearch: (city: string) => void;
}

const WeatherPlaceholder = ({ onExampleSearch }: WeatherPlaceholderProps) => {
  const exampleCities = ['New York', 'London', 'Tokyo', 'Sydney', 'Paris'];
  
  return (
    <div className="flex flex-col items-center justify-center py-12 text-white">
      <CloudSun className="h-24 w-24 text-white/70 mb-6" />
      
      <h2 className="text-2xl font-semibold mb-2">Search for a city</h2>
      <p className="text-white/70 text-center max-w-md mb-8">
        Enter a city name in the search bar above to see current weather conditions 
        and a 5-day forecast.
      </p>
      
      <div className="space-y-3">
        <p className="text-sm font-medium text-white/80">Try one of these cities:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {exampleCities.map(city => (
            <Button 
              key={city} 
              variant="outline"
              className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
              onClick={() => onExampleSearch(city)}
            >
              <MapPin className="mr-1 h-4 w-4" />
              {city}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="mt-10 p-4 bg-white/10 rounded-lg max-w-md">
        <div className="flex items-start">
          <Search className="h-6 w-6 mr-3 mt-1 flex-shrink-0 text-white/80" />
          <div>
            <h3 className="font-medium">Quick Tip</h3>
            <p className="text-sm text-white/70">
              For the most accurate results, include the country name for cities with common names
              (e.g., "Paris, France" or "London, UK").
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPlaceholder;
