import React from 'react';
import { Location } from '../types';

interface EarthVisualizationProps {
  location: Location;
  asteroidProgress: number;
  missDistance: number;
  hasLaunched: boolean;
}

export const EarthVisualization: React.FC<EarthVisualizationProps> = ({
  location,
  asteroidProgress,
  missDistance,
  hasLaunched
}) => {
  const getTrajectoryColor = () => {
    if (!hasLaunched) return '#ef4444';
    if (missDistance >= 2000) return '#22c55e';
    if (missDistance >= 1000) return '#eab308';
    if (missDistance >= 0) return '#f97316';
    return '#ef4444';
  };

  const getAsteroidPosition = () => {
    const angle = (location.lon + 180) * (Math.PI / 180);
    const latRad = location.lat * (Math.PI / 180);

    const baseDistance = 250;
    const currentDistance = baseDistance * (1 - asteroidProgress);

    let offsetX = 0;
    let offsetY = 0;

    if (location.allowDeflection && hasLaunched && missDistance > 0) {
      const deflectionFactor = Math.min(missDistance / 2000, 1);
      offsetX = Math.sin(angle) * deflectionFactor * 100;
      offsetY = -Math.cos(latRad) * deflectionFactor * 80;
    }

    const x = 200 + Math.cos(angle) * currentDistance + offsetX;
    const y = 200 + Math.sin(latRad) * currentDistance * 0.5 + offsetY;

    return { x, y };
  };

  const asteroidPos = getAsteroidPosition();
  const trajectoryColor = getTrajectoryColor();

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <radialGradient id="earthGradient">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1e293b" />
          </radialGradient>
          <radialGradient id="asteroidGlow">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle
          cx="200"
          cy="200"
          r="80"
          fill="url(#earthGradient)"
          stroke="#60a5fa"
          strokeWidth="2"
        />

        <g opacity="0.3">
          {[...Array(6)].map((_, i) => (
            <circle
              key={`lat-${i}`}
              cx="200"
              cy="200"
              r={80 - (i * 13)}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="0.5"
            />
          ))}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            return (
              <line
                key={`lon-${i}`}
                x1="200"
                y1="200"
                x2={200 + Math.cos(angle) * 80}
                y2={200 + Math.sin(angle) * 80}
                stroke="#60a5fa"
                strokeWidth="0.5"
              />
            );
          })}
        </g>

        <path
          d={`M ${asteroidPos.x} ${asteroidPos.y} Q ${(asteroidPos.x + 200) / 2} ${(asteroidPos.y + 200) / 2 - 30} 200 200`}
          fill="none"
          stroke={trajectoryColor}
          strokeWidth="2"
          strokeDasharray="4 2"
          opacity="0.7"
        />

        <circle
          cx={asteroidPos.x}
          cy={asteroidPos.y}
          r="20"
          fill="url(#asteroidGlow)"
        />
        <circle
          cx={asteroidPos.x}
          cy={asteroidPos.y}
          r="8"
          fill="#78350f"
          stroke="#fbbf24"
          strokeWidth="2"
        />

        {asteroidProgress < 0.95 && (
          <>
            <line
              x1={asteroidPos.x - 12}
              y1={asteroidPos.y - 12}
              x2={asteroidPos.x - 20}
              y2={asteroidPos.y - 20}
              stroke="#f59e0b"
              strokeWidth="2"
              opacity="0.6"
            />
            <line
              x1={asteroidPos.x + 12}
              y1={asteroidPos.y - 12}
              x2={asteroidPos.x + 20}
              y2={asteroidPos.y - 20}
              stroke="#f59e0b"
              strokeWidth="2"
              opacity="0.6"
            />
          </>
        )}

        {location.type !== 'simulation' && (
          <circle
            cx="200"
            cy="200"
            r="4"
            fill={location.type === 'ocean' ? '#3b82f6' : '#22c55e'}
            stroke="white"
            strokeWidth="1"
          />
        )}
      </svg>
    </div>
  );
};
