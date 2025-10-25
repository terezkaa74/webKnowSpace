import { useState, useEffect } from 'react';
import { Activity, Mountain, Waves } from 'lucide-react';
import RealisticSimulation from './components/RealisticSimulation';
import LandImpact from './components/LandImpact';
import OceanImpact from './components/OceanImpact';
import './asteroid-simulator.css';

export const AsteroidSimulator = () => {
  const [activeTab, setActiveTab] = useState('simulation');
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        const sizes = ['small', 'small', 'small', 'medium', 'medium', 'large'];
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: sizes[Math.floor(Math.random() * sizes.length)],
          duration: `${2 + Math.random() * 3}s`,
          delay: `${Math.random() * 3}s`,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star star-${star.size}`}
          style={{
            left: star.left,
            top: star.top,
            '--duration': star.duration,
            '--delay': star.delay,
          }}
        />
      ))}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">
            AstroSim
          </h1>
          <p className="text-slate-300 text-lg">
            Asteroid Bennu Impact Simulation & Consequences
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'simulation'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Activity size={20} />
            Realistic Simulation
          </button>
          <button
            onClick={() => setActiveTab('land')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'land'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/50'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Mountain size={20} />
            Land Impact
          </button>
          <button
            onClick={() => setActiveTab('ocean')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'ocean'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Waves size={20} />
            Ocean Impact
          </button>
        </div>

        <main>
          {activeTab === 'simulation' && <RealisticSimulation />}
          {activeTab === 'land' && <LandImpact />}
          {activeTab === 'ocean' && <OceanImpact />}
        </main>

        <footer className="mt-12 mb-6 text-center">
          <div className="border-t border-slate-700 pt-6">
            <p className="text-slate-400 text-sm">
              Developed by <span className="text-slate-300 font-semibold">Tereza Gorgolova</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
