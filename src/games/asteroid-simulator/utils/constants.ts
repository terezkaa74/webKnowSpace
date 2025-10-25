import { Location, FactCard, BennuProperties } from '../types';

export const LOCATIONS: Location[] = [
  {
    name: 'Atlantic Ocean Impact',
    lat: 33,
    lon: -65,
    type: 'ocean',
    description: 'Fixed impact scenario - Watch the catastrophic effects of an Atlantic Ocean impact with tsunamis',
    allowDeflection: false
  },
  {
    name: 'Central USA Impact',
    lat: 40,
    lon: -100,
    type: 'land',
    description: 'Fixed impact scenario - Observe the devastating crater formation and regional destruction',
    allowDeflection: false
  },
  {
    name: 'Real Simulation Mode',
    lat: 35,
    lon: -90,
    type: 'simulation',
    description: 'Physics-based deflection simulation - Apply force to change the asteroid trajectory and save Earth',
    allowDeflection: true
  }
];

export const DEFAULT_BENNU: BennuProperties = {
  diameter: 492,
  mass: 7.33e10,
  velocity: 27.7,
  density: 1.19
};

export const FACT_CARDS: FactCard[] = [
  {
    id: 1,
    title: 'The Real Bennu',
    content: '101955 Bennu is a REAL near-Earth asteroid discovered in 1999. NASA\'s OSIRIS-REx mission visited Bennu and returned samples to Earth in 2023. It has a 1 in 2,700 chance of impacting Earth between 2175-2199.',
    source: 'NASA OSIRIS-REx Mission Facts',
    trigger: 'load'
  },
  {
    id: 2,
    title: 'Impact Energy Scale',
    content: 'Bennu carries approximately 1,400 megatons of TNT equivalent energy - equal to 80,000 Hiroshima bombs. This is enough energy to power the entire world for 2 weeks.',
    source: 'NASA CNEOS Impact Effects Calculator',
    trigger: 'slider'
  },
  {
    id: 3,
    title: 'Deflection Science',
    content: 'In 2022, NASA\'s DART mission proved we can deflect asteroids. The spacecraft changed asteroid Dimorphos\'s orbit by 33 minutes - a small nudge years in advance creates a big miss.',
    source: 'NASA DART Mission Results',
    trigger: 'launch'
  },
  {
    id: 4,
    title: 'Planetary Defense',
    content: 'NASA tracks over 30,000 near-Earth objects. Early detection is key - just 1 cm/s velocity change 10 years out creates a 315 km miss distance. We can protect Earth with current technology.',
    source: 'NASA Planetary Defense Coordination Office',
    trigger: 'win'
  },
  {
    id: 5,
    title: 'About Bennu',
    content: 'Bennu is a B-type carbonaceous asteroid - a primitive rubble-pile structure made of carbon-rich materials left over from the solar system\'s formation. It spins once every 4.3 hours and has a distinctive spinning-top shape with an equatorial ridge.',
    source: 'JPL Small-Body Database',
    trigger: 'lose'
  }
];

export const SAFE_MISS_DISTANCE = 2000;
export const INITIAL_MISS_DISTANCE = -500;
export const INITIAL_TIME = 10.0;
export const MIN_DEFLECTION = 0.1;
export const MAX_DEFLECTION = 5.0;
export const DEFAULT_DEFLECTION = 2.5;
