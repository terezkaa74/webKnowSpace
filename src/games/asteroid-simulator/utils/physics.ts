import { BennuProperties } from '../types';

export function calculateMissDistance(
  deflectionForce: number,
  timeElapsed: number
): number {
  return -500 + deflectionForce * timeElapsed * 31.536;
}

export function calculateImpactEnergy(bennuProps: BennuProperties): number {
  const velocityMs = bennuProps.velocity * 1000;
  const energy = 0.5 * bennuProps.mass * Math.pow(velocityMs, 2);
  const megatons = energy / (4.184 * Math.pow(10, 15));
  return megatons;
}

export function calculateCraterDiameter(
  diameter: number,
  velocity: number,
  density: number
): number {
  const impactorDiameter = diameter;
  const craterDiameter = 1.161 * Math.pow(impactorDiameter, 0.13) *
                         Math.pow(velocity, 0.44) *
                         Math.pow(density, 0.33);
  return craterDiameter;
}

export function calculateTsunamiHeight(
  energy: number,
  distance: number
): number {
  const baseHeight = Math.sqrt(energy) * 2;
  return baseHeight * Math.exp(-distance / 1000);
}

export function getImpactConsequences(
  location: { type: 'ocean' | 'land' | 'simulation'; lat: number; lon: number },
  bennuProps: BennuProperties
) {
  const energy = calculateImpactEnergy(bennuProps);

  if (location.type === 'ocean' || location.type === 'simulation') {
    return {
      type: 'ocean' as const,
      energy,
      tsunamiHeight: calculateTsunamiHeight(energy, 0),
      affectedCoastline: 5000,
      affectedCities: ['Miami', 'New York', 'Boston', 'Lisbon', 'West Africa Coast'],
      casualties: '15-50 million',
      economicDamage: '$2-5 trillion'
    };
  } else {
    const craterDiameter = calculateCraterDiameter(
      bennuProps.diameter / 1000,
      bennuProps.velocity,
      bennuProps.density
    );

    return {
      type: 'land' as const,
      energy,
      craterDiameter,
      craterDepth: craterDiameter * 0.3,
      devastationRadius: craterDiameter * 20,
      affectedPopulation: '5-10 million',
      agriculturalLoss: '30% of US production',
      economicDamage: '$3-8 trillion'
    };
  }
}
