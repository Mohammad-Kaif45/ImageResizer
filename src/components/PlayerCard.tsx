import React from 'react';
import { PlayerStats } from '../types';
import { Trophy } from 'lucide-react';

interface PlayerCardProps {
  player: PlayerStats;
  isWinner: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, isWinner }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg ${isWinner ? 'bg-green-50' : 'bg-white'}`}>
      <div className="relative">
        {isWinner && (
          <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-2">
            <Trophy className="w-6 h-6 text-white" />
          </div>
        )}
        <img
          src={player.imageUrl}
          alt={player.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
      </div>
      <h2 className="text-2xl font-bold text-center mb-2">{player.name}</h2>
      <p className="text-gray-600 text-center mb-4">{player.country}</p>
      
      <div className="space-y-2">
        <StatRow label="Age" value={player.age.toString()} />
        <StatRow label="Matches" value={player.matches.toString()} />
        <StatRow label="Runs" value={player.runs.toLocaleString()} />
        <StatRow label="Average" value={player.average.toFixed(2)} />
        <StatRow label="Strike Rate" value={player.strikeRate.toFixed(2)} />
        <StatRow label="Centuries" value={player.centuries.toString()} />
        <StatRow label="Half Centuries" value={player.halfCenturies.toString()} />
        <StatRow label="Highest Score" value={player.highestScore.toString()} />
      </div>
    </div>
  );
};

const StatRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);