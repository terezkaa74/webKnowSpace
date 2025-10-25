import React, { useEffect, useState } from 'react';
import { Info, X } from 'lucide-react';
import { FactCard as FactCardType } from '../types';

interface FactCardProps {
  fact: FactCardType;
  onClose: () => void;
  index?: number;
}

export const FactCard: React.FC<FactCardProps> = ({ fact, onClose, index = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const bottomOffset = 4 + (index * 12);

  return (
    <div
      className={`fixed right-4 z-50 max-w-sm transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      style={{ bottom: `${bottomOffset}rem` }}
    >
      <div className="bg-slate-900 border-2 border-cyan-500 rounded-lg p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1">{fact.title}</h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-2">{fact.content}</p>
            <p className="text-xs text-cyan-400 italic">Source: {fact.source}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
