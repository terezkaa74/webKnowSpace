import { useState } from 'react';
import { Play, RotateCcw, Info } from 'lucide-react';
import SimulationControls from './SimulationControls';
import TrajectoryVisualization from './TrajectoryVisualization';
import ImpactResults from './ImpactResults';
import { simulateImpact, SimulationParams, ImpactResult } from '../physics/impactCalculations';
import { BENNU_DATA } from '../physics/bennuData';

export default function RealisticSimulation() {
  const [params, setParams] = useState<SimulationParams>({
    diameter: BENNU_DATA.diameter,
    velocity: 12.7,
    deflectionForce: 2.5
  });

  const [timeBeforeImpact, setTimeBeforeImpact] = useState(10);
  const [result, setResult] = useState<ImpactResult | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  const [hasRun, setHasRun] = useState(false);

  const handleReset = () => {
    setParams({
      diameter: BENNU_DATA.diameter,
      velocity: 12.7,
      deflectionForce: 2.5
    });
    setTimeBeforeImpact(10);
    setHasRun(false);
    setShowInfo(true);
    setResult(null);
  };

  const handleRunSimulation = () => {
    setShowInfo(false);
    setHasRun(true);
    const newResult = simulateImpact(params, timeBeforeImpact);
    setResult(newResult);
  };

  return (
    <div className="space-y-6">
      {showInfo && (
        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Info className="text-blue-400 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-white font-bold text-lg mb-2">
                Realistic Bennu Impact Simulation
              </h3>
              <p className="text-blue-200 mb-3 leading-relaxed">
                This simulation uses peer-reviewed impact scaling laws and data from NASA's OSIRIS-REx mission
                to accurately model asteroid Bennu's potential impact with Earth. All calculations are based on
                established scientific research from planetary defense studies.
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-900/30 p-3 rounded">
                  <div className="text-blue-300 font-semibold mb-1">Scientific Models Used</div>
                  <ul className="text-blue-200 space-y-1 text-xs">
                    <li>• Holsapple crater scaling laws (1993)</li>
                    <li>• Collins et al. air blast equations (2005)</li>
                    <li>• Thermal radiation from Glasstone & Dolan</li>
                    <li>• Seismic scaling from Shishkin (2007)</li>
                    <li>• Tsunami models from Ward & Asphaug (2000)</li>
                  </ul>
                </div>
                <div className="bg-blue-900/30 p-3 rounded">
                  <div className="text-blue-300 font-semibold mb-1">Orbital Mechanics</div>
                  <ul className="text-blue-200 space-y-1 text-xs">
                    <li>• Real Bennu orbital parameters from JPL</li>
                    <li>• Kepler's laws for trajectory changes</li>
                    <li>• Newton's F=ma for deflection forces</li>
                    <li>• Linear momentum approximation for small Δv</li>
                    <li>• Multi-year propagation of orbital shifts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <SimulationControls
          diameter={params.diameter}
          velocity={params.velocity}
          deflectionForce={params.deflectionForce}
          timeBeforeImpact={timeBeforeImpact}
          onDiameterChange={(value) => setParams({ ...params, diameter: value })}
          onVelocityChange={(value) => setParams({ ...params, velocity: value })}
          onDeflectionChange={(value) => setParams({ ...params, deflectionForce: value })}
          onTimeChange={setTimeBeforeImpact}
        />

        {hasRun && result && (
          <TrajectoryVisualization
            deflectionDistance={result.missDistance}
            willImpact={result.willImpact}
          />
        )}

        {!hasRun && (
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Play size={64} className="mx-auto mb-4 text-blue-400 opacity-50" />
              <p className="text-slate-400 text-lg">
                Adjust parameters and click "Run Simulation" to begin
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleRunSimulation}
          className="flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
        >
          <Play size={24} />
          Run Simulation
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg shadow-lg transition-all"
        >
          <RotateCcw size={24} />
          Reset to Bennu Defaults
        </button>
      </div>

      {hasRun && result && !showInfo && (
        <ImpactResults result={result} />
      )}

      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Scientific Context & Real-World Data</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-900 p-4 rounded">
            <div className="text-blue-400 font-semibold mb-2">🎯 DART Mission (2022)</div>
            <p className="text-slate-300 text-xs leading-relaxed">
              NASA's Double Asteroid Redirection Test successfully altered Dimorphos's orbit by 33 minutes
              using a 570 kg spacecraft at 6.1 km/s. This proved kinetic impactors can deflect asteroids,
              changing orbital period by 4%. Mission data validates these simulation models.
            </p>
          </div>
          <div className="bg-slate-900 p-4 rounded">
            <div className="text-blue-400 font-semibold mb-2">🔭 Bennu's Actual Risk</div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Bennu has a 1-in-2,700 chance of impacting Earth between 2175-2199. OSIRIS-REx mapped
              its surface to centimeter precision and sampled its composition. At 492m diameter and
              1,190 kg/m³ density, an impact would release ~1,200 megatons of energy.
            </p>
          </div>
          <div className="bg-slate-900 p-4 rounded">
            <div className="text-blue-400 font-semibold mb-2">⚡ Historical Reference</div>
            <p className="text-slate-300 text-xs leading-relaxed">
              The 1908 Tunguska event (12-15 megatons) from a ~50m object flattened 2,000 km² of forest.
              The Chicxulub impact (66 million years ago) from a ~10km asteroid released 100 million megatons,
              causing mass extinction. Bennu sits between these extremes - regional catastrophe scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
