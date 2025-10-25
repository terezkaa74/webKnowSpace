import React from 'react';
import { Play, Pause, RotateCcw, Rocket } from 'lucide-react';
import { Location, BennuProperties } from '../types';
import { calculateMissDistance } from '../utils/physics';
import { SAFE_MISS_DISTANCE, MIN_DEFLECTION, MAX_DEFLECTION } from '../utils/constants';
import { EarthVisualization } from './EarthVisualization';

interface GameScreenProps {
  location: Location;
  timeRemaining: number;
  deflectionForce: number;
  missDistance: number;
  hasLaunched: boolean;
  isRunning: boolean;
  timeSpeed: number;
  bennuProps: BennuProperties;
  onLaunch: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onDeflectionChange: (force: number) => void;
  onTimeSpeedChange: (speed: number) => void;
  onBennuChange: (props: Partial<BennuProperties>) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  location,
  timeRemaining,
  deflectionForce,
  missDistance,
  hasLaunched,
  isRunning,
  timeSpeed,
  bennuProps,
  onLaunch,
  onPause,
  onResume,
  onReset,
  onDeflectionChange,
  onTimeSpeedChange,
  onBennuChange
}) => {
  const timeElapsed = 10.0 - timeRemaining;
  const predictedMiss = hasLaunched
    ? missDistance
    : calculateMissDistance(deflectionForce, 10.0);

  const getMissDistanceColor = (distance: number) => {
    if (distance >= SAFE_MISS_DISTANCE) return 'text-green-400';
    if (distance >= 1000) return 'text-yellow-400';
    if (distance >= 0) return 'text-orange-400';
    return 'text-red-400';
  };

  const asteroidProgress = Math.max(0, Math.min(1, timeElapsed / 10.0));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            AstroSim
          </h1>
          <p className="text-gray-400">{location.type === 'simulation' ? 'Mission: Deflect Bennu and Save Earth' : `Scenario: ${location.name}`}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold mb-4 text-cyan-400">Mission Status</h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Time to Impact</span>
                  <span className="text-2xl font-bold">{timeRemaining.toFixed(1)} YEARS</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full transition-all"
                    style={{ width: `${(timeElapsed / 10.0) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <span className="text-gray-400">Current Miss Distance</span>
                <div className={`text-3xl font-bold ${getMissDistanceColor(missDistance)}`}>
                  {missDistance >= 0 ? '+' : ''}{missDistance.toFixed(0)} km
                </div>
                <div className="text-sm text-gray-500">Required: +{SAFE_MISS_DISTANCE} km</div>
              </div>

              <div>
                <span className="text-gray-400">Deflection Applied</span>
                <div className="text-2xl font-bold text-cyan-400">
                  {hasLaunched ? deflectionForce.toFixed(2) : '0.00'} cm/s
                </div>
              </div>

              {hasLaunched && (
                <div className="flex gap-2 mt-4">
                  {isRunning ? (
                    <button
                      onClick={onPause}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded flex items-center justify-center gap-2"
                    >
                      <Pause className="w-5 h-5" />
                      Pause
                    </button>
                  ) : (
                    <button
                      onClick={onResume}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded flex items-center justify-center gap-2"
                    >
                      <Play className="w-5 h-5" />
                      Resume
                    </button>
                  )}
                  <button
                    onClick={onReset}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reset
                  </button>
                </div>
              )}

              {hasLaunched && (
                <div className="flex gap-2">
                  <span className="text-gray-400">Speed:</span>
                  {[1, 2, 5, 10].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => onTimeSpeedChange(speed)}
                      className={`px-3 py-1 rounded text-sm ${
                        timeSpeed === speed
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 h-96">
            <EarthVisualization
              location={location}
              asteroidProgress={asteroidProgress}
              missDistance={missDistance}
              hasLaunched={hasLaunched}
            />
          </div>

          {location.allowDeflection ? (
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 lg:col-span-2">
              <h2 className="text-xl font-bold mb-4 text-cyan-400">Deflection Controls</h2>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-400">Deflection Force</label>
                    <span className="text-xl font-bold">{deflectionForce.toFixed(2)} cm/s</span>
                  </div>
                  <input
                    type="range"
                    min={MIN_DEFLECTION}
                    max={MAX_DEFLECTION}
                    step="0.1"
                    value={deflectionForce}
                    onChange={(e) => onDeflectionChange(parseFloat(e.target.value))}
                    disabled={hasLaunched}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: hasLaunched
                        ? '#334155'
                        : `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((deflectionForce - MIN_DEFLECTION) / (MAX_DEFLECTION - MIN_DEFLECTION)) * 100}%, #334155 ${((deflectionForce - MIN_DEFLECTION) / (MAX_DEFLECTION - MIN_DEFLECTION)) * 100}%, #334155 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{MIN_DEFLECTION} cm/s</span>
                    <span>{MAX_DEFLECTION} cm/s</span>
                  </div>
                </div>

                {!hasLaunched && (
                  <div className="bg-slate-800 p-4 rounded border border-cyan-500/30">
                    <div className="text-sm text-gray-400 mb-1">Predicted Final Miss Distance</div>
                    <div className={`text-2xl font-bold ${getMissDistanceColor(predictedMiss)}`}>
                      {predictedMiss >= 0 ? '+' : ''}{predictedMiss.toFixed(0)} km
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {predictedMiss >= SAFE_MISS_DISTANCE ? '✓ Safe trajectory' : '⚠ Insufficient deflection'}
                    </div>
                  </div>
                )}

                {!hasLaunched && (
                  <button
                    onClick={onLaunch}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg text-xl flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/50 transition-all hover:scale-105"
                  >
                    <Rocket className="w-6 h-6" />
                    LAUNCH KINETIC IMPACTOR
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 lg:col-span-2">
              <h2 className="text-xl font-bold mb-4 text-red-400">Fixed Impact Scenario</h2>
              <div className="bg-slate-800 p-4 rounded border border-red-500/30 mb-4">
                <p className="text-gray-300 mb-2">
                  This is a predetermined impact scenario. No deflection is possible.
                </p>
                <p className="text-gray-400 text-sm">
                  Watch the impact unfold and observe the consequences based on real scientific calculations.
                </p>
              </div>
              {!hasLaunched && (
                <button
                  onClick={onLaunch}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-lg text-xl flex items-center justify-center gap-3 shadow-lg shadow-red-500/50 transition-all hover:scale-105"
                >
                  START IMPACT SIMULATION
                </button>
              )}
            </div>
          )}

          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-cyan-400">Asteroid Properties</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-400">Diameter</label>
                  <span className="font-bold">{bennuProps.diameter.toFixed(0)} m</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="10"
                  value={bennuProps.diameter}
                  onChange={(e) => onBennuChange({ diameter: parseFloat(e.target.value) })}
                  disabled={hasLaunched}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100m</span>
                  <span className="text-cyan-400">Default: 492m</span>
                  <span>1000m</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-400">Velocity</label>
                  <span className="font-bold">{bennuProps.velocity.toFixed(1)} km/s</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="0.5"
                  value={bennuProps.velocity}
                  onChange={(e) => onBennuChange({ velocity: parseFloat(e.target.value) })}
                  disabled={hasLaunched}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10 km/s</span>
                  <span className="text-cyan-400">Default: 27.7 km/s</span>
                  <span>50 km/s</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-400">Mass</label>
                  <span className="font-bold">{(bennuProps.mass / 1e9).toFixed(1)} × 10⁹ kg</span>
                </div>
                <input
                  type="range"
                  min="1e9"
                  max="2e11"
                  step="1e9"
                  value={bennuProps.mass}
                  onChange={(e) => onBennuChange({ mass: parseFloat(e.target.value) })}
                  disabled={hasLaunched}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 × 10⁹</span>
                  <span className="text-cyan-400">Default: 73.3 × 10⁹ kg</span>
                  <span>200 × 10⁹</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-400">Density</label>
                  <span className="font-bold">{bennuProps.density.toFixed(2)} g/cm³</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.05"
                  value={bennuProps.density}
                  onChange={(e) => onBennuChange({ density: parseFloat(e.target.value) })}
                  disabled={hasLaunched}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.5</span>
                  <span className="text-cyan-400">Default: 1.19 g/cm³</span>
                  <span>3.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
