import { BENNU_DATA } from './bennuData';

export interface SimulationParams {
  diameter: number;
  velocity: number;
  deflectionForce: number;
}

export interface ImpactConsequences {
  energyMegatons: number;
  fireballRadius: number;
  severeDamageRadius: number;
  moderateDamageRadius: number;
  affectedArea: number;
  craterDiameter: number;
  craterDepth: number;
  ejectaBlanket: number;
  earthquakeMagnitude: number;
  strongShakingRadius: number;
  feltRadius: number;
  tsunamiInitialHeight?: number;
  tsunamiCoastalHeight?: number;
  coastalInundation?: number;
  ejectedThickness10km?: number;
  ejectedThickness30km?: number;
  vegetationIgnition?: number;
}

export interface ImpactResult {
  willImpact: boolean;
  missDistance: number;
  impactEnergy: number;
  consequences?: ImpactConsequences;
  locationType?: 'ocean' | 'inland';
  outcome: string;
  details: string[];
}

export function calculateImpactEnergy(mass: number, velocity: number): number {
  return 0.5 * mass * Math.pow(velocity * 1000, 2);
}

export function energyToMegatons(joules: number): number {
  return joules / 4.184e15;
}

export function calculateMass(diameter: number, density: number = BENNU_DATA.density): number {
  const radius = (diameter / 2) * 1000;
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  return volume * density;
}

export function calculateImpactConsequences(
  energy: number,
  isOcean: boolean = false
): ImpactConsequences {
  const megatons = energyToMegatons(energy);

  const impactorDiameter = BENNU_DATA.diameter * 1000;

  const craterDiameter = isOcean
    ? 1.24 * Math.pow(energy / 4.184e15, 0.29) * Math.pow(1.6, 0.33) * Math.pow(1000, -0.22) * Math.pow(45, -0.11) / 1000
    : 1.18 * Math.pow(energy / 4.184e15, 0.29) * Math.pow(2700, 0.11) * Math.pow(1000, -0.22) * Math.pow(9.8, -0.11) / 1000;

  const craterDepth = isOcean
    ? 0.25 * craterDiameter
    : 0.28 * craterDiameter;

  const ejectaBlanket = 2.5 * craterDiameter;

  const fireballRadius = 0.28 * Math.pow(megatons, 0.4);

  const airBlastPressure20psi = 2.2 * Math.pow(megatons, 0.33);
  const airBlastPressure1psi = 6.5 * Math.pow(megatons, 0.33);
  const thermalRadiationRadius = 1.8 * Math.pow(megatons, 0.41);

  const severeDamageRadius = airBlastPressure20psi;
  const moderateDamageRadius = airBlastPressure1psi;
  const affectedArea = Math.PI * Math.pow(moderateDamageRadius, 2);

  const magnitude = Math.min(9.9, 0.67 * Math.log10(energy) - 5.87);
  const strongShakingRadius = Math.pow(10, (0.48 * magnitude - 1.27));
  const feltRadius = Math.pow(10, (0.48 * magnitude + 0.33));

  const consequences: ImpactConsequences = {
    energyMegatons: megatons,
    fireballRadius,
    severeDamageRadius,
    moderateDamageRadius,
    affectedArea,
    craterDiameter,
    craterDepth,
    ejectaBlanket,
    earthquakeMagnitude: magnitude,
    strongShakingRadius,
    feltRadius
  };

  if (isOcean) {
    const waterDepth = 5;
    const tsunamiAmplitude = 0.1 * impactorDiameter * Math.pow(impactorDiameter / waterDepth, 0.25);
    const deepWaterWaveHeight = Math.min(1000, tsunamiAmplitude / 1000);
    const shallowWaterAmplification = 5;
    const coastalWaveHeight = deepWaterWaveHeight * shallowWaterAmplification;
    const inundationDistance = coastalWaveHeight * 0.3;

    consequences.tsunamiInitialHeight = deepWaterWaveHeight;
    consequences.tsunamiCoastalHeight = coastalWaveHeight;
    consequences.coastalInundation = inundationDistance;
  } else {
    const ejectaVolume = (Math.PI / 3) * Math.pow(craterDiameter * 500, 2) * (craterDepth * 1000);
    const thickness10km = (ejectaVolume / (Math.PI * Math.pow(10000, 2))) * Math.pow(0.5, 2);
    const thickness30km = (ejectaVolume / (Math.PI * Math.pow(30000, 2))) * Math.pow(0.2, 2);

    consequences.ejectedThickness10km = Math.max(5, thickness10km);
    consequences.ejectedThickness30km = Math.max(0.5, thickness30km);
    consequences.vegetationIgnition = thermalRadiationRadius;
  }

  return consequences;
}

export function calculateDeflection(
  force: number,
  timeBeforeImpact: number
): number {
  const deltaV = force / 100;
  const timeSeconds = timeBeforeImpact * 365.25 * 24 * 3600;
  const displacement = deltaV * timeSeconds;
  return displacement / 1000;
}

export function simulateImpact(params: SimulationParams, timeBeforeImpact: number = 10): ImpactResult {
  const mass = calculateMass(params.diameter);
  const deflectionDistance = calculateDeflection(params.deflectionForce, timeBeforeImpact);

  const baseTrajectory = 0;
  const finalMissDistance = baseTrajectory + deflectionDistance;

  const SAFE_MISS_DISTANCE = 2500;
  const willImpact = finalMissDistance < SAFE_MISS_DISTANCE;
  const impactEnergy = calculateImpactEnergy(mass, params.velocity);
  let outcome = '';
  let details: string[] = [];

  if (!willImpact) {
    outcome = `EARTH SAVED! Bennu will miss by ${finalMissDistance.toFixed(0)} km`;
    details = [
      `Deflection force of ${params.deflectionForce.toFixed(2)} cm/s successfully altered trajectory`,
      `Total displacement: ${deflectionDistance.toFixed(0)} km over ${timeBeforeImpact} years`,
      `Population protected: 8 billion people`,
      `Civilization preserved - asteroid continues safely through solar system`
    ];

    return {
      willImpact: false,
      missDistance: finalMissDistance,
      impactEnergy,
      outcome,
      details
    };
  }

  const consequences = calculateImpactConsequences(impactEnergy, false);

  outcome = `IMPACT EVENT - Catastrophic Impact`;
  details = [
    `Total energy release: ${consequences.energyMegatons.toFixed(0)} megatons TNT (${(consequences.energyMegatons / 15).toFixed(0)}x Tsar Bomba)`,
    `Fireball: ${consequences.fireballRadius.toFixed(1)} km radius - everything vaporized instantly`,
    `Impact crater: ${consequences.craterDiameter.toFixed(1)} km diameter, ${(consequences.craterDepth * 1000).toFixed(0)} m deep`,
    `Crater volume: ${((Math.PI / 3) * Math.pow(consequences.craterDiameter * 500, 2) * consequences.craterDepth * 1000 / 1e9).toFixed(1)} km³ of material displaced`,
    `Air blast (20 psi): ${consequences.severeDamageRadius.toFixed(1)} km - reinforced buildings destroyed`,
    `Air blast (1 psi): ${consequences.moderateDamageRadius.toFixed(1)} km - residential structures collapse`,
    `Thermal radiation: ${consequences.vegetationIgnition?.toFixed(1)} km - third-degree burns, fires ignited`,
    `Ejecta blanket: ${consequences.ejectaBlanket.toFixed(1)} km radius covered in molten rock and debris`,
    `Ejecta depth: ${consequences.ejectedThickness10km?.toFixed(1)}m at 10km, ${consequences.ejectedThickness30km?.toFixed(1)}m at 30km`,
    `Total destruction area: ${consequences.affectedArea.toFixed(0)} km² (larger than many countries)`,
    `Seismic shock: Magnitude ${consequences.earthquakeMagnitude.toFixed(1)} felt ${consequences.feltRadius.toFixed(0)} km away`,
    `Atmospheric effects: Dust cloud causing regional crop failure, potential "impact winter"`,
    `Estimated casualties: Millions within blast radius, tens of millions from secondary effects`
  ];

  return {
    willImpact: true,
    missDistance: finalMissDistance,
    impactEnergy,
    consequences,
    outcome,
    details
  };
}
