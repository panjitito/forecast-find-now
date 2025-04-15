
import { cn } from '@/lib/utils';

interface LoadingAnimationProps {
  className?: string;
}

const LoadingAnimation = ({ className }: LoadingAnimationProps) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div className="relative h-24 w-24">
        {/* Sun */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full bg-yellow-400 animate-pulse" />
        </div>
        
        {/* Orbiting cloud */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-6 w-6 bg-white/80 rounded-full" />
          </div>
        </div>
        
        {/* Orbiting raindrop */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <div className="h-4 w-4 bg-blue-400 rounded-full" />
          </div>
        </div>
        
        {/* Orbiting snowflake */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '1s' }}>
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
            <div className="h-5 w-5 bg-blue-100 rounded-full" />
          </div>
        </div>
        
        {/* Orbiting lightning */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
            <div className="h-5 w-5 bg-yellow-300 rounded-full" />
          </div>
        </div>
      </div>
      
      <p className="text-white/80 font-medium mt-4 absolute -bottom-8">Loading weather data...</p>
    </div>
  );
};

export default LoadingAnimation;
