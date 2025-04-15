
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const WeatherSearch = ({ onSearch, isLoading }: WeatherSearchProps) => {
  const [city, setCity] = useState('');
  const [popularCities, setPopularCities] = useState<string[]>([
    'London', 'New York', 'Tokyo', 'Paris', 'Sydney'
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Check for last searched city on mount
  useEffect(() => {
    const lastCity = localStorage.getItem('lastSearchedCity');
    if (lastCity) {
      setCity(lastCity);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setShowSuggestions(false);
    }
  };

  const handleCityClick = (selectedCity: string) => {
    setCity(selectedCity);
    onSearch(selectedCity);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 relative">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="pr-10 bg-white/10 backdrop-blur-md border-none text-white placeholder:text-white/70 h-12"
          />
          <Search className="absolute right-3 top-3.5 h-5 w-5 text-white/70" />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !city.trim()}
          className="bg-white/20 hover:bg-white/30 text-white h-12 px-6"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {showSuggestions && !isLoading && (
        <div className="mt-2 bg-white/20 backdrop-blur-md rounded-lg overflow-hidden animate-fadeIn">
          <div className="p-2">
            <p className="text-white/80 text-xs font-medium mb-2 pl-2">Popular Cities</p>
            <div className="grid grid-cols-3 gap-2">
              {popularCities.map((popularCity) => (
                <button
                  key={popularCity}
                  onClick={() => handleCityClick(popularCity)}
                  className="flex items-center gap-1 p-2 rounded-md text-white/90 hover:bg-white/20 text-sm text-left transition-colors"
                >
                  <MapPin className="h-3 w-3" />
                  <span>{popularCity}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
