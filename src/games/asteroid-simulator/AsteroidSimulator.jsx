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
    <div className="asteroid-sim-container">
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
      <div className="asteroid-sim-content">
        <header className="asteroid-sim-header">
          <h1 className="asteroid-sim-title">
            AstroSim
          </h1>
          <p className="asteroid-sim-subtitle">
            Asteroid Bennu Impact Simulation & Consequences
          </p>
        </header>

        <div className="asteroid-sim-tabs">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`asteroid-sim-tab ${
              activeTab === 'simulation' ? 'active-tab-simulation' : ''
            }`}
          >
            <Activity size={20} />
            Realistic Simulation
          </button>
          <button
            onClick={() => setActiveTab('land')}
            className={`asteroid-sim-tab ${
              activeTab === 'land' ? 'active-tab-land' : ''
            }`}
          >
            <Mountain size={20} />
            Land Impact
          </button>
          <button
            onClick={() => setActiveTab('ocean')}
            className={`asteroid-sim-tab ${
              activeTab === 'ocean' ? 'active-tab-ocean' : ''
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

        <footer className="asteroid-sim-footer">
          <div className="asteroid-sim-footer-content">
            <p className="asteroid-sim-footer-text">
              Developed by <span className="asteroid-sim-footer-author">Tereza Gorgolova</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
