import { useState, useRef } from 'react';
import { Waves, Flame, Ship, AlertTriangle, Wind, Droplets, Play, RotateCcw } from 'lucide-react';

export default function OceanImpact() {
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
      <div className="bg-blue-900/30 border-2 border-blue-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Waves className="text-blue-500" size={32} />
          <div>
            <h2 className="text-2xl font-bold text-white">Deep Ocean Impact Scenario</h2>
            <p className="text-blue-300">Atlantic Ocean (33°N, 65°W) - Between New York and Bermuda</p>
          </div>
        </div>
        <p className="text-slate-300 text-sm mt-4">
          This scenario models a Bennu impact in the deep Atlantic Ocean, showing tsunami formation,
          wave propagation, coastal inundation, and trans-oceanic consequences.
        </p>
      </div>

      {!showResults ? (
        <div className="bg-slate-800 rounded-lg p-12 shadow-xl flex flex-col items-center justify-center min-h-[400px]">
          <Waves size={64} className="mx-auto mb-6 text-blue-400 opacity-50" />
          <h3 className="text-2xl font-bold text-white mb-3">Ocean Impact Analysis</h3>
          <p className="text-slate-400 text-center mb-8 max-w-md">
            Run the simulation to see detailed predictions of a Bennu impact in the Atlantic Ocean,
            including tsunami formation, wave propagation, and coastal devastation.
          </p>
          <button
            onClick={handleRunSimulation}
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
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

          <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="text-blue-400" size={20} />
              <span className="text-blue-400 font-semibold">Water Depth</span>
            </div>
            <div className="text-3xl font-bold text-white">5,000-6,000 meters</div>
            <div className="text-blue-300 text-sm mt-1">Deep abyssal plain - maximum energy transfer to water</div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Flame className="text-orange-500" size={24} />
          Immediate Impact Effects
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <div className="text-blue-400 font-semibold mb-2">Total Energy Release</div>
            <div className="text-3xl font-bold text-white mb-1">1,400 Megatons</div>
            <div className="text-slate-400 text-sm">TNT equivalent</div>
          </div>
          <div className="bg-cyan-900/20 border border-cyan-700 rounded-lg p-4">
            <div className="text-cyan-400 font-semibold mb-2">Impact Location</div>
            <div className="text-2xl font-bold text-white mb-1">33°N, 65°W</div>
            <div className="text-slate-400 text-sm">Mid-Atlantic region</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Waves className="text-blue-500" size={24} />
          Tsunami Formation
        </h3>
        <div className="space-y-4">
          <div className="bg-blue-950 border-2 border-blue-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-blue-400 font-bold">Initial Wave Height (Impact Point)</div>
              <span className="text-3xl font-bold text-white">500 m</span>
            </div>
            <p className="text-blue-300 text-sm">
              Massive displacement cavity forms instantly. Water column vaporizes and creates supersonic shock wave
              through ocean.
            </p>
          </div>

          <div className="bg-blue-900/40 border-2 border-blue-500 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-blue-400 font-bold">Open Ocean Wave Height</div>
              <span className="text-3xl font-bold text-white">1-2 m</span>
            </div>
            <p className="text-blue-300 text-sm">
              Tsunami spreads across ocean at 800 km/h (500 mph). Barely noticeable to ships in deep water,
              but carrying catastrophic energy.
            </p>
            <div className="mt-3 bg-blue-950 rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <Ship className="text-cyan-400" size={18} />
                <span className="text-cyan-400 font-semibold text-sm">Wave Speed</span>
              </div>
              <div className="text-2xl font-bold text-white">800 km/h</div>
              <div className="text-slate-400 text-xs mt-1">Travels at jet aircraft speed</div>
            </div>
          </div>

          <div className="bg-cyan-900/40 border-2 border-cyan-500 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-cyan-400 font-bold">Coastal Amplification Factor</div>
              <span className="text-3xl font-bold text-white">20-50x</span>
            </div>
            <p className="text-cyan-300 text-sm">
              As tsunami reaches shallow coastal waters, wave height increases dramatically. Ocean floor
              friction slows wave base while top continues forward.
            </p>
          </div>

          <div className="bg-red-900/40 border-2 border-red-500 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-red-400 font-bold">Final Coastal Wave Height</div>
              <span className="text-3xl font-bold text-white">10-20 m</span>
            </div>
            <p className="text-red-300 text-sm">
              Devastating walls of water strike coastlines. 3-6 story building equivalent height.
              Multiple waves arrive over several hours.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-900 rounded-lg">
          <h4 className="text-white font-semibold mb-3">Tsunami Propagation Visualization</h4>
          <div className="aspect-video max-w-2xl mx-auto bg-gradient-to-b from-blue-950 to-blue-900 rounded-lg relative border border-blue-700 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-[90%] h-[90%] rounded-full border-4 border-red-500/20 animate-pulse"></div>
              <div className="absolute w-[70%] h-[70%] rounded-full border-4 border-orange-500/30 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute w-[50%] h-[50%] rounded-full border-4 border-yellow-500/40 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <div className="absolute w-[30%] h-[30%] rounded-full border-4 border-blue-500/50 animate-pulse" style={{ animationDelay: '0.9s' }}></div>
              <div className="absolute w-[10%] h-[10%] rounded-full bg-blue-400 animate-pulse flex items-center justify-center">
                <Waves className="text-white" size={24} />
              </div>
            </div>
          </div>
          <div className="mt-4 text-center text-slate-400 text-sm">
            Tsunami waves radiate outward from impact point at 800 km/h
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={24} />
          Coastal Inundation
        </h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <div className="text-red-400 font-semibold mb-2">Inundation Distance Inland</div>
            <div className="text-3xl font-bold text-white mb-1">5-15 km</div>
            <div className="text-slate-400 text-sm">Depends on terrain and coastal slope</div>
          </div>
          <div className="bg-orange-900/20 border border-orange-700 rounded-lg p-4">
            <div className="text-orange-400 font-semibold mb-2">Wave Duration</div>
            <div className="text-3xl font-bold text-white mb-1">6-12 hours</div>
            <div className="text-slate-400 text-sm">Multiple waves arriving</div>
          </div>
        </div>

        <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
          <h4 className="text-red-400 font-bold mb-3">Affected Coastlines</h4>
          <div className="space-y-2 text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span><strong>Eastern United States:</strong> From Florida to Maine - major cities including New York, Boston, Miami</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span><strong>Caribbean Islands:</strong> Bahamas, Cuba, Jamaica, Puerto Rico - complete devastation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span><strong>Western Europe:</strong> UK, Ireland, France, Spain, Portugal - coastal flooding</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span><strong>West Africa:</strong> Morocco, Senegal, Nigeria - vulnerable low-lying coasts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span><strong>South America:</strong> Brazil, Venezuela - northern coastlines affected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Flame className="text-orange-500" size={24} />
          Fireball & Immediate Effects
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-900 p-4 rounded-lg border border-orange-700">
            <div className="text-slate-400 text-sm mb-1">Fireball Radius</div>
            <div className="text-2xl font-bold text-orange-400">3.8 km</div>
            <div className="text-slate-500 text-xs mt-1">Complete vaporization</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-blue-700">
            <div className="text-slate-400 text-sm mb-1">Water Vaporized</div>
            <div className="text-2xl font-bold text-blue-400">~10 km³</div>
            <div className="text-slate-500 text-xs mt-1">Instant steam explosion</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-cyan-700">
            <div className="text-slate-400 text-sm mb-1">Cavity Depth</div>
            <div className="text-2xl font-bold text-cyan-400">1-2 km</div>
            <div className="text-slate-500 text-xs mt-1">Temporary void</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Wind className="text-blue-500" size={24} />
          Seismic & Atmospheric Effects
        </h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-900 p-4 rounded-lg border border-red-700">
            <div className="text-slate-400 text-sm mb-1">Earthquake Magnitude</div>
            <div className="text-3xl font-bold text-red-400">7.8</div>
            <div className="text-slate-500 text-xs mt-1">Felt across entire ocean basin</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-orange-700">
            <div className="text-slate-400 text-sm mb-1">Atmospheric Pressure Wave</div>
            <div className="text-2xl font-bold text-orange-400">Global</div>
            <div className="text-slate-500 text-xs mt-1">Circles Earth multiple times</div>
          </div>
        </div>
        <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
          <p className="text-blue-300 text-sm">
            <strong>Air Blast:</strong> Supersonic shock wave propagates through atmosphere. Ships within 100 km
            experience hurricane-force winds. Coastal areas hit by both air blast and tsunami within minutes.
          </p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Environmental Effects Timeline</h3>
        <div className="space-y-3">
          <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
            <div className="text-blue-400 font-bold mb-1">Immediate (1-6 months)</div>
            <p className="text-slate-300 text-sm">
              Water vapor and salt aerosols injected into stratosphere. 1,400,000 tons of material.
              Regional climate disruption begins. Coastal recovery efforts hampered by contaminated water.
            </p>
          </div>
          <div className="bg-cyan-900/20 border-l-4 border-cyan-500 p-4 rounded">
            <div className="text-cyan-400 font-bold mb-1">Short-term (6-24 months)</div>
            <p className="text-slate-300 text-sm">
              Maximum atmospheric cooling. Salt particles affect precipitation patterns. Ocean ecosystem
              disruption - deep water mixing brings nutrients but also disturbs currents.
            </p>
          </div>
          <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
            <div className="text-yellow-400 font-bold mb-1">Medium-term (2-5 years)</div>
            <p className="text-slate-300 text-sm">
              Gradual atmospheric clearing. Ocean currents slowly stabilize. Marine life begins recovery
              but fishing industry severely affected.
            </p>
          </div>
          <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded">
            <div className="text-green-400 font-bold mb-1">Long-term (5-10 years)</div>
            <p className="text-slate-300 text-sm">
              Return to normal climate. Coastal rebuilding continues. Ocean ecosystem recovery ongoing.
              Ozone layer regeneration (30-50% depletion recovery).
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Impact Energy Scaling Formulas</h3>
        <div className="space-y-3 font-mono text-sm">
          <div className="bg-slate-900 p-3 rounded border border-blue-700">
            <div className="text-blue-400 mb-1">Initial Wave Height</div>
            <div className="text-white">h = 0.5 × (E)<sup>0.25</sup></div>
            <div className="text-slate-400 text-xs mt-1">E = impact energy in joules</div>
          </div>
          <div className="bg-slate-900 p-3 rounded border border-cyan-700">
            <div className="text-cyan-400 mb-1">Coastal Run-up Height</div>
            <div className="text-white">R = 20 × h<sub>deep</sub></div>
            <div className="text-slate-400 text-xs mt-1">Amplification factor 20-50x</div>
          </div>
          <div className="bg-slate-900 p-3 rounded border border-green-700">
            <div className="text-green-400 mb-1">Inundation Distance</div>
            <div className="text-white">D = R / slope</div>
            <div className="text-slate-400 text-xs mt-1">Depends on coastal terrain</div>
          </div>
        </div>
      </div>

      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
        <h3 className="text-blue-400 font-bold text-lg mb-3">Trans-Atlantic Catastrophe Summary</h3>
        <p className="text-blue-200 mb-3">
          A deep ocean Bennu impact would generate catastrophic tsunamis affecting coastlines across the entire
          Atlantic basin. Multiple population centers with hundreds of millions of people would face 10-20 meter
          waves arriving with little warning. The economic and humanitarian impact would be unprecedented.
        </p>
        <p className="text-blue-200">
          While ocean impacts don't create craters or ejecta like land impacts, the tsunami hazard makes them
          equally catastrophic. Early detection and deflection remain our only defense against such scenarios.
        </p>
      </div>
        </>
      )}
    </div>
  );
}
