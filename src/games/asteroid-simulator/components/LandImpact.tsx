import { useState, useRef } from 'react';
import { Flame, Skull, AlertTriangle, Mountain, Wind, TreeDeciduous, Play, RotateCcw } from 'lucide-react';

export default function LandImpact() {
  const [showResults, setShowResults] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const handleRunSimulation = () => {
    setShowResults(true);
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="space-y-6" ref={topRef}>
      <div className="bg-red-900/30 border-2 border-red-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Mountain className="text-red-500" size={32} />
          <div>
            <h2 className="text-2xl font-bold text-white">Inland Impact Scenario</h2>
            <p className="text-red-300">Central United States (40°N, 100°W) - Agricultural Heartland</p>
          </div>
        </div>
        <p className="text-slate-300 text-sm mt-4">
          This scenario models a direct Bennu impact on land, showing the complete destruction zones,
          crater formation, seismic effects, and long-term environmental consequences.
        </p>
      </div>

      {!showResults ? (
        <div className="bg-slate-800 rounded-lg p-12 shadow-xl flex flex-col items-center justify-center min-h-[400px]">
          <Mountain size={64} className="mx-auto mb-6 text-red-400 opacity-50" />
          <h3 className="text-2xl font-bold text-white mb-3">Land Impact Analysis</h3>
          <p className="text-slate-400 text-center mb-8 max-w-md">
            Run the simulation to see detailed predictions of a Bennu impact on the central United States,
            including destruction zones, crater formation, and environmental effects.
          </p>
          <button
            onClick={handleRunSimulation}
            className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            <Play size={24} />
            Run Impact Simulation
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <button
              onClick={() => setShowResults(false)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg shadow-lg transition-all"
            >
              <RotateCcw size={20} />
              Reset Simulation
            </button>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Flame className="text-orange-500" size={24} />
              Immediate Impact Effects
            </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <div className="text-red-400 font-semibold mb-2">Total Energy Release</div>
            <div className="text-3xl font-bold text-white mb-1">1,400 Megatons</div>
            <div className="text-slate-400 text-sm">TNT equivalent</div>
          </div>
          <div className="bg-orange-900/20 border border-orange-700 rounded-lg p-4">
            <div className="text-orange-400 font-semibold mb-2">Impact Velocity</div>
            <div className="text-3xl font-bold text-white mb-1">12.7 km/s</div>
            <div className="text-slate-400 text-sm">28,400 mph at impact</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={24} />
          Destruction Zones
        </h3>
        <div className="space-y-4">
          <div className="bg-red-950 border-2 border-red-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                <span className="text-red-400 font-bold">Fireball Radius</span>
              </div>
              <span className="text-2xl font-bold text-white">3.8 km</span>
            </div>
            <p className="text-red-300 text-sm">Complete vaporization of everything within this circle</p>
          </div>

          <div className="bg-red-900/40 border-2 border-red-500 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-red-400 font-bold">Severe Damage Zone</span>
              </div>
              <span className="text-2xl font-bold text-white">45 km radius</span>
            </div>
            <p className="text-red-300 text-sm">All structures destroyed, 100% fatalities</p>
          </div>

          <div className="bg-orange-900/40 border-2 border-orange-500 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-orange-400 font-bold">Moderate Damage Zone</span>
              </div>
              <span className="text-2xl font-bold text-white">95 km radius</span>
            </div>
            <p className="text-orange-300 text-sm">Most buildings collapse, widespread casualties</p>
          </div>

          <div className="bg-yellow-900/40 border-2 border-yellow-500 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-yellow-400 font-bold">Affected Area</span>
              </div>
              <span className="text-2xl font-bold text-white">6,300 km²</span>
            </div>
            <p className="text-yellow-300 text-sm">Completely destroyed - visible from space</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-900 rounded-lg">
          <h4 className="text-white font-semibold mb-3">Impact Zone Visualization</h4>
          <div className="aspect-square max-w-md mx-auto bg-slate-950 rounded-lg relative border border-slate-700 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-[95%] h-[95%] rounded-full border-4 border-yellow-500/30 flex items-center justify-center">
                <div className="absolute text-yellow-400 text-xs font-bold" style={{ top: '2%' }}>200 km</div>
              </div>
              <div className="absolute w-[70%] h-[70%] rounded-full border-4 border-orange-500/50 flex items-center justify-center">
                <div className="absolute text-orange-400 text-xs font-bold" style={{ top: '5%' }}>95 km</div>
              </div>
              <div className="absolute w-[35%] h-[35%] rounded-full border-4 border-red-500/70 flex items-center justify-center">
                <div className="absolute text-red-400 text-xs font-bold" style={{ top: '8%' }}>45 km</div>
              </div>
              <div className="absolute w-[8%] h-[8%] rounded-full bg-red-600 animate-pulse flex items-center justify-center">
                <Skull className="text-white" size={16} />
              </div>
            </div>
          </div>
          <div className="mt-4 text-center text-slate-400 text-sm">
            Concentric circles show destruction zones radiating from ground zero
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Mountain className="text-orange-500" size={24} />
          Crater Formation
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-4 rounded-lg border border-orange-700">
            <div className="text-slate-400 text-sm mb-1">Crater Diameter</div>
            <div className="text-2xl font-bold text-orange-400">6.2 km</div>
            <div className="text-slate-500 text-xs mt-1">6,200 meters wide</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-orange-700">
            <div className="text-slate-400 text-sm mb-1">Crater Depth</div>
            <div className="text-2xl font-bold text-orange-400">800 m</div>
            <div className="text-slate-500 text-xs mt-1">Deeper than deepest canyon</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-orange-700">
            <div className="text-slate-400 text-sm mb-1">Ejecta Blanket</div>
            <div className="text-2xl font-bold text-orange-400">100 km</div>
            <div className="text-slate-500 text-xs mt-1">Debris extension</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-orange-700">
            <div className="text-slate-400 text-sm mb-1">Visual Scale</div>
            <div className="text-2xl font-bold text-orange-400">Space</div>
            <div className="text-slate-500 text-xs mt-1">Visible from orbit</div>
          </div>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="bg-orange-900/20 border border-orange-700 rounded-lg p-4">
            <div className="text-orange-400 font-semibold mb-2">Ejecta Thickness at 10km</div>
            <div className="text-3xl font-bold text-white">10 meters</div>
            <div className="text-slate-400 text-sm">Buried structures</div>
          </div>
          <div className="bg-orange-900/20 border border-orange-700 rounded-lg p-4">
            <div className="text-orange-400 font-semibold mb-2">Ejecta Thickness at 30km</div>
            <div className="text-3xl font-bold text-white">1 meter</div>
            <div className="text-slate-400 text-sm">Still significant coverage</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Wind className="text-blue-500" size={24} />
          Seismic Effects
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-slate-900 p-4 rounded-lg border border-red-700">
            <div className="text-slate-400 text-sm mb-1">Earthquake Magnitude</div>
            <div className="text-3xl font-bold text-red-400">7.8</div>
            <div className="text-slate-500 text-xs mt-1">Richter scale</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-orange-700">
            <div className="text-slate-400 text-sm mb-1">Strong Shaking</div>
            <div className="text-2xl font-bold text-orange-400">200 km</div>
            <div className="text-slate-500 text-xs mt-1">Structural damage</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-yellow-700">
            <div className="text-slate-400 text-sm mb-1">Felt Radius</div>
            <div className="text-2xl font-bold text-yellow-400">500 km</div>
            <div className="text-slate-500 text-xs mt-1">Major shaking</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-blue-700">
            <div className="text-slate-400 text-sm mb-1">Duration</div>
            <div className="text-2xl font-bold text-blue-400">2-5 min</div>
            <div className="text-slate-500 text-xs mt-1">Intense motion</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TreeDeciduous className="text-green-500" size={24} />
          Vegetation & Atmospheric Heating
        </h3>
        <div className="bg-orange-900/20 border border-orange-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-orange-400 font-semibold">Vegetation Ignition Radius</div>
            <div className="text-3xl font-bold text-white">100 km</div>
          </div>
          <p className="text-orange-300 text-sm">
            Intense atmospheric heating ignites all vegetation within 100 kilometer radius from impact point.
            Firestorms develop from thermal radiation and re-entering ejecta.
          </p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Environmental Effects Timeline</h3>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <div className="text-red-400 font-bold mb-1">Immediate (1-6 months)</div>
            <p className="text-slate-300 text-sm">Dust cloud formation, global temperature drop begins. 1,400,000 tons of dust injected into stratosphere.</p>
          </div>
          <div className="bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded">
            <div className="text-orange-400 font-bold mb-1">Short-term (6-24 months)</div>
            <p className="text-slate-300 text-sm">Maximum cooling effect, agricultural disruption. Temperature reduction of ~1°C globally.</p>
          </div>
          <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
            <div className="text-yellow-400 font-bold mb-1">Medium-term (2-5 years)</div>
            <p className="text-slate-300 text-sm">Gradual atmospheric clearing, partial recovery. Stratospheric particles slowly settle.</p>
          </div>
          <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded">
            <div className="text-green-400 font-bold mb-1">Long-term (5-10 years)</div>
            <p className="text-slate-300 text-sm">Return to normal climate conditions. Ozone layer recovery begins (30-50% depletion).</p>
          </div>
        </div>
      </div>

      <div className="bg-red-900/30 border border-red-700 rounded-lg p-6">
        <h3 className="text-red-400 font-bold text-lg mb-3">Regional Catastrophe Summary</h3>
        <p className="text-red-200 mb-3">
          An inland Bennu impact would devastate 6,300 km² of the central United States, destroying the agricultural
          heartland and affecting global food supplies. The crater would be visible from space, and the seismic
          effects would be felt across the entire continent.
        </p>
        <p className="text-red-200">
          This scenario demonstrates why early asteroid detection and deflection are critical. With sufficient warning
          time (10+ years), even small deflection forces can prevent this catastrophe entirely.
        </p>
      </div>
        </>
      )}
    </div>
  );
}
