import React from 'react';
import { MapPin, Rocket, AlertCircle } from 'lucide-react';
import { Location } from '../types';
import { LOCATIONS } from '../utils/constants';

interface LocationSelectionProps {
  onSelectLocation: (location: Location) => void;
}

export const LocationSelection: React.FC<LocationSelectionProps> = ({ onSelectLocation }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            AstroSim
          </h1>
          <p className="text-xl text-gray-300">
            Select impact scenario
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCATIONS.map((location) => {
            const Icon = location.type === 'simulation' ? Rocket : location.type === 'ocean' ? AlertCircle : MapPin;
            const borderColor = location.allowDeflection ? 'border-green-700 hover:border-green-500' : 'border-red-700 hover:border-red-500';
            const shadowColor = location.allowDeflection ? 'hover:shadow-green-500/20' : 'hover:shadow-red-500/20';
            const iconColor = location.allowDeflection ? 'text-green-400' : 'text-red-400';

            return (
              <button
                key={location.name}
                onClick={() => onSelectLocation(location)}
                className={`bg-slate-800 border-2 ${borderColor} rounded-lg p-6 transition-all hover:scale-105 hover:shadow-xl ${shadowColor} text-left`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <Icon className={`w-8 h-8 ${iconColor} flex-shrink-0`} />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{location.name}</h3>
                      {location.type !== 'simulation' && (
                        <p className="text-xs text-gray-400 mb-2">
                          {location.lat}°{location.lat >= 0 ? 'N' : 'S'}, {Math.abs(location.lon)}°{location.lon >= 0 ? 'E' : 'W'}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{location.description}</p>
                  <div className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                    location.type === 'simulation'
                      ? 'bg-green-900/50 text-green-400 border border-green-700'
                      : 'bg-red-900/50 text-red-400 border border-red-700'
                  }`}>
                    {location.type === 'simulation' ? '🚀 Interactive Deflection' : location.type === 'ocean' ? '🌊 Fixed Ocean Impact' : '🌍 Fixed Land Impact'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>Based on NASA data for asteroid 101955 Bennu</p>
        </div>
      </div>
    </div>
  );
};
