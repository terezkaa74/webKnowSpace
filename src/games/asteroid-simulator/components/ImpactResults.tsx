import { AlertTriangle, CheckCircle, Zap, Skull, Waves, Flame } from 'lucide-react';
import { ImpactResult } from '../physics/impactCalculations';
import { energyToMegatons } from '../physics/impactCalculations';

interface ImpactResultsProps {
  result: ImpactResult;
}

export default function ImpactResults({ result }: ImpactResultsProps) {
  const megatons = energyToMegatons(result.impactEnergy);

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        {result.willImpact ? (
          <>
            <AlertTriangle className="text-red-500" size={32} />
            <h3 className="text-2xl font-bold text-white">Impact Consequences</h3>
          </>
        ) : (
          <>
            <CheckCircle className="text-green-500" size={32} />
            <h3 className="text-2xl font-bold text-white">Mission Success</h3>
          </>
        )}
      </div>

      <div className={`p-4 rounded-lg mb-6 ${
        result.willImpact ? 'bg-red-900/30 border border-red-700' : 'bg-green-900/30 border border-green-700'
      }`}>
        <p className={`text-lg font-semibold ${
          result.willImpact ? 'text-red-300' : 'text-green-300'
        }`}>
          {result.outcome}
        </p>
      </div>

      {!result.willImpact && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900 p-4 rounded-lg">
            <div className="text-slate-400 text-sm mb-1">Miss Distance</div>
            <div className="text-green-400 text-xl font-bold">
              {Math.abs(result.missDistance).toFixed(0)} km
            </div>
            <div className="text-slate-500 text-xs mt-1">Safe passage</div>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg">
            <div className="text-slate-400 text-sm mb-1">Energy Avoided</div>
            <div className="text-white text-xl font-bold flex items-center gap-2">
              <Zap size={20} className="text-yellow-400" />
              {megatons.toFixed(0)} MT
            </div>
            <div className="text-slate-500 text-xs mt-1">
              {(result.impactEnergy / 1e15).toFixed(2)} × 10¹⁵ J
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg">
            <div className="text-slate-400 text-sm mb-1">Lives Saved</div>
            <div className="text-green-400 text-xl font-bold">8 Billion</div>
            <div className="text-slate-500 text-xs mt-1">Global population</div>
          </div>
        </div>
      )}

      {result.willImpact && result.consequences && (
        <div className="mb-6">
          <div className="bg-red-900/20 border-2 border-red-700 rounded-lg p-6 mb-4">
            <h4 className="text-red-400 font-bold text-lg mb-4 flex items-center gap-2">
              {result.locationType === 'ocean' ? <Waves size={24} /> : <Flame size={24} />}
              {result.locationType === 'ocean' ? 'Deep Ocean Impact' : 'Inland Impact'}
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 p-4 rounded-lg">
                <div className="text-slate-400 text-sm mb-1">Total Energy</div>
                <div className="text-red-400 text-xl font-bold flex items-center gap-2">
                  <Zap size={20} className="text-yellow-400" />
                  {result.consequences.energyMegatons.toFixed(0)} MT
                </div>
                <div className="text-slate-500 text-xs mt-1">TNT equivalent</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg">
                <div className="text-slate-400 text-sm mb-1">Fireball Radius</div>
                <div className="text-orange-400 text-xl font-bold flex items-center gap-2">
                  <Flame size={20} />
                  {result.consequences.fireballRadius} km
                </div>
                <div className="text-slate-500 text-xs mt-1">Complete vaporization</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg">
                <div className="text-slate-400 text-sm mb-1">Earthquake</div>
                <div className="text-red-400 text-xl font-bold">
                  {result.consequences.earthquakeMagnitude.toFixed(1)}
                </div>
                <div className="text-slate-500 text-xs mt-1">Richter scale</div>
              </div>

              {result.locationType === 'ocean' ? (
                <>
                  <div className="bg-slate-900 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm mb-1">Initial Tsunami</div>
                    <div className="text-blue-400 text-xl font-bold flex items-center gap-2">
                      <Waves size={20} />
                      {result.consequences.tsunamiInitialHeight} m
                    </div>
                    <div className="text-slate-500 text-xs mt-1">At impact point</div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm mb-1">Coastal Wave</div>
                    <div className="text-blue-400 text-xl font-bold">
                      {result.consequences.tsunamiCoastalHeight} m
                    </div>
                    <div className="text-slate-500 text-xs mt-1">20-50x amplified</div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm mb-1">Inundation</div>
                    <div className="text-blue-400 text-xl font-bold">
                      {result.consequences.coastalInundation} km
                    </div>
                    <div className="text-slate-500 text-xs mt-1">Inland flooding</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-slate-900 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm mb-1">Crater Size</div>
                    <div className="text-orange-400 text-xl font-bold flex items-center gap-2">
                      <Skull size={20} />
                      {result.consequences.craterDiameter.toFixed(1)} km
                    </div>
                    <div className="text-slate-500 text-xs mt-1">
                      {result.consequences.craterDepth.toFixed(0)}m deep
                    </div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm mb-1">Severe Damage</div>
                    <div className="text-red-400 text-xl font-bold">
                      {result.consequences.severeDamageRadius} km
                    </div>
                    <div className="text-slate-500 text-xs mt-1">100% fatalities</div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm mb-1">Moderate Damage</div>
                    <div className="text-orange-400 text-xl font-bold">
                      {result.consequences.moderateDamageRadius} km
                    </div>
                    <div className="text-slate-500 text-xs mt-1">Building collapse</div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm mb-1">Destroyed Area</div>
                    <div className="text-red-400 text-xl font-bold">
                      {result.consequences.affectedArea.toFixed(0)} km²
                    </div>
                    <div className="text-slate-500 text-xs mt-1">Complete destruction</div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm mb-1">Ejecta Blanket</div>
                    <div className="text-orange-400 text-xl font-bold">
                      {result.consequences.ejectaBlanket.toFixed(0)} km
                    </div>
                    <div className="text-slate-500 text-xs mt-1">Debris radius</div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm mb-1">Felt Radius</div>
                    <div className="text-yellow-400 text-xl font-bold">
                      {result.consequences.feltRadius} km
                    </div>
                    <div className="text-slate-500 text-xs mt-1">Seismic shaking</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h4 className="text-white font-semibold flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
          Detailed Analysis
        </h4>
        {result.details.map((detail, index) => (
          <div
            key={index}
            className="bg-slate-900 p-3 rounded border-l-4 border-blue-500 text-slate-300 text-sm"
          >
            {detail}
          </div>
        ))}
      </div>

      {!result.willImpact && (
        <div className="mt-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
          <p className="text-green-300 text-sm">
            <strong>Deflection Success:</strong> This demonstrates the principle behind NASA's DART mission,
            which successfully altered asteroid Dimorphos's orbit in 2022. Early detection combined with
            sufficient warning time allows small velocity changes to prevent catastrophic impacts.
          </p>
        </div>
      )}

      {result.willImpact && (
        <div className="mt-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
          <div className="mb-4">
            <h5 className="text-red-400 font-semibold mb-2">Environmental Effects Timeline</h5>
            <div className="space-y-2 text-sm text-slate-300">
              <div>
                <span className="text-red-400 font-bold">Immediate (1-6 months):</span> Dust cloud formation,
                global temperature drop begins
              </div>
              <div>
                <span className="text-red-400 font-bold">Short-term (6-24 months):</span> Maximum cooling effect,
                agricultural disruption
              </div>
              <div>
                <span className="text-orange-400 font-bold">Medium-term (2-5 years):</span> Gradual atmospheric
                clearing, partial recovery
              </div>
              <div>
                <span className="text-yellow-400 font-bold">Long-term (5-10 years):</span> Return to normal
                climate conditions
              </div>
            </div>
          </div>
          <p className="text-red-300 text-sm">
            <strong>Regional Catastrophe:</strong> An impact of this magnitude would cause widespread devastation
            across the affected region. This scenario underscores why planetary defense is critical - early detection
            and timely deflection missions are humanity's best defense against cosmic threats. With a miss distance of just
            {Math.abs(result.missDistance).toFixed(0)} km (required: 2,500 km), more deflection force or earlier
            intervention would have prevented this catastrophe.
          </p>
        </div>
      )}
    </div>
  );
}
