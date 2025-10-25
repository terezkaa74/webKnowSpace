import React from 'react';
import { Trophy, AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Location, BennuProperties } from '../types';
import { getImpactConsequences, calculateImpactEnergy } from '../utils/physics';

interface ResultsScreenProps {
  result: 'win' | 'lose';
  location: Location;
  missDistance: number;
  deflectionForce: number;
  bennuProps: BennuProperties;
  onReset: () => void;
  onBackToMenu: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  result,
  location,
  missDistance,
  deflectionForce,
  bennuProps,
  onReset,
  onBackToMenu
}) => {
  const consequences = result === 'lose' ? getImpactConsequences(location, bennuProps) : null;
  const impactEnergy = calculateImpactEnergy(bennuProps);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {result === 'win' ? (
          <div className="text-center">
            <div className="mb-8">
              <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4 animate-bounce" />
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                MISSION SUCCESS!
              </h1>
              <p className="text-2xl text-gray-300 mb-2">
                Earth saved by {missDistance.toFixed(0)} km
              </p>
              <p className="text-gray-400">8 billion lives protected</p>
            </div>

            <div className="bg-slate-900 border-2 border-green-500 rounded-lg p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6 text-green-400">Mission Statistics</h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <div className="text-gray-400 text-sm">Deflection Force</div>
                  <div className="text-2xl font-bold">{deflectionForce.toFixed(2)} cm/s</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Final Miss Distance</div>
                  <div className="text-2xl font-bold text-green-400">+{missDistance.toFixed(0)} km</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Target Location</div>
                  <div className="text-xl font-bold">{location.name}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Mission Time</div>
                  <div className="text-xl font-bold">10.0 years</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Asteroid Diameter</div>
                  <div className="text-xl font-bold">{bennuProps.diameter.toFixed(0)} m</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Impact Energy Avoided</div>
                  <div className="text-xl font-bold">{impactEnergy.toFixed(0)} MT</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-cyan-500 rounded-lg p-6 mb-6 text-left">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">Planetary Defense Success</h3>
              <p className="text-gray-300 mb-3">
                NASA tracks over 30,000 near-Earth objects. Early detection is key - just 1 cm/s velocity change 10 years out creates a 315 km miss distance.
              </p>
              <p className="text-gray-300">
                This simulation demonstrates that we can protect Earth with current technology. The key is early detection and timely action.
              </p>
              <p className="text-sm text-cyan-400 italic mt-3">Source: NASA Planetary Defense Coordination Office</p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-8">
              <AlertTriangle className="w-24 h-24 text-red-500 mx-auto mb-4" />
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
                IMPACT EVENT
              </h1>
              <p className="text-2xl text-gray-300 mb-2">
                Asteroid struck {location.name}
              </p>
              <p className="text-gray-400">Miss distance: {missDistance >= 0 ? '+' : ''}{missDistance.toFixed(0)} km (Required: +2,000 km)</p>
            </div>

            {consequences && (
              <div className="bg-slate-900 border-2 border-red-500 rounded-lg p-8 mb-6">
                <h2 className="text-2xl font-bold mb-6 text-red-400">Impact Consequences</h2>

                {consequences.type === 'ocean' ? (
                  <div className="space-y-4 text-left">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Impact Energy</div>
                        <div className="text-xl font-bold">{consequences.energy.toFixed(0)} megatons</div>
                        <div className="text-xs text-gray-500">~80,000 Hiroshima bombs</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Initial Tsunami Height</div>
                        <div className="text-xl font-bold">{consequences.tsunamiHeight.toFixed(0)} meters</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Affected Coastline</div>
                        <div className="text-xl font-bold">{consequences.affectedCoastline.toFixed(0)} km</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Estimated Casualties</div>
                        <div className="text-xl font-bold text-red-400">{consequences.casualties}</div>
                      </div>
                    </div>
                    <div className="border-t border-slate-700 pt-4">
                      <div className="text-gray-400 text-sm mb-2">Major Cities at Risk</div>
                      <div className="text-white">{consequences.affectedCities.join(', ')}</div>
                    </div>
                    <div className="border-t border-slate-700 pt-4">
                      <div className="text-gray-400 text-sm mb-2">Economic Impact</div>
                      <div className="text-xl font-bold">{consequences.economicDamage}</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-left">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Impact Energy</div>
                        <div className="text-xl font-bold">{consequences.energy.toFixed(0)} megatons</div>
                        <div className="text-xs text-gray-500">~80,000 Hiroshima bombs</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Crater Diameter</div>
                        <div className="text-xl font-bold">{consequences.craterDiameter.toFixed(1)} km</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Crater Depth</div>
                        <div className="text-xl font-bold">{consequences.craterDepth.toFixed(1)} km</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Devastation Radius</div>
                        <div className="text-xl font-bold text-red-400">{consequences.devastationRadius.toFixed(0)} km</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Affected Population</div>
                        <div className="text-xl font-bold text-red-400">{consequences.affectedPopulation}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Agricultural Loss</div>
                        <div className="text-xl font-bold">{consequences.agriculturalLoss}</div>
                      </div>
                    </div>
                    <div className="border-t border-slate-700 pt-4">
                      <div className="text-gray-400 text-sm mb-2">Economic Impact</div>
                      <div className="text-xl font-bold">{consequences.economicDamage}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-slate-900 border border-cyan-500 rounded-lg p-6 mb-6 text-left">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">About Bennu</h3>
              <p className="text-gray-300 mb-3">
                Bennu is a B-type carbonaceous asteroid - a primitive rubble-pile structure made of carbon-rich materials left over from the solar system's formation. It spins once every 4.3 hours and has a distinctive spinning-top shape with an equatorial ridge.
              </p>
              <p className="text-gray-300 mb-3">
                The real Bennu has a 1 in 2,700 chance of impacting Earth between 2175-2199. NASA's OSIRIS-REx mission visited Bennu and returned samples to Earth in 2023, helping us better understand these potentially hazardous asteroids.
              </p>
              <p className="text-gray-300">
                This simulation shows why early detection and deflection are critical. With enough warning, even a small deflection force can create a safe miss distance.
              </p>
              <p className="text-sm text-cyan-400 italic mt-3">Source: JPL Small-Body Database & OSIRIS-REx Mission</p>
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={onReset}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-all hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
          <button
            onClick={onBackToMenu}
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-all hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};
