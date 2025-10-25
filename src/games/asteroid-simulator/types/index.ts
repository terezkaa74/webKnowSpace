export interface Location {
  name: string;
  lat: number;
  lon: number;
  type: 'ocean' | 'land' | 'simulation';
  description: string;
  allowDeflection?: boolean;
}

export interface GameState {
  screen: 'location' | 'game' | 'results';
  selectedLocation: Location | null;
  timeRemaining: number;
  deflectionForce: number;
  missDistance: number;
  hasLaunched: boolean;
  isRunning: boolean;
  timeSpeed: number;
  gameResult: 'win' | 'lose' | null;
}

export interface BennuProperties {
  diameter: number;
  mass: number;
  velocity: number;
  density: number;
}

export interface FactCard {
  id: number;
  title: string;
  content: string;
  source: string;
  trigger: 'load' | 'slider' | 'launch' | 'win' | 'lose';
}
