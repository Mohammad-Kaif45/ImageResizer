import React from 'react';
import { PlayerStats } from '../types';

interface PlayerSelectorProps {
  players: Record<string, PlayerStats>;
  selectedPlayer: string;
  onSelect: (playerName: string) => void;
  label: string;
}

export const PlayerSelector: React.FC<PlayerSelectorProps> = ({
  players,
  selectedPlayer,
  onSelect,
  label
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={selectedPlayer}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        {Object.keys(players).map((playerName) => (
          <option key={playerName} value={playerName}>
            {playerName}
          </option>
        ))}
      </select>
    </div>
  );
};