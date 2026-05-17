import React from 'react';

export type FencerStance = 'attack_high' | 'attack_low' | 'parry_high' | 'parry_low' | 'idle';

interface StickFencerProps {
  x: number;
  y: number;
  stance: FencerStance;
  isPlayer: boolean;
  name: string;
  health: number;
  maxHealth: number;
}

export const StickFencer: React.FC<StickFencerProps> = ({
  x, y, stance, isPlayer, name, health, maxHealth,
}) => {
  const fencerColor = isPlayer ? '#161813' : '#FB2B57';
  const scaleX = isPlayer ? 1 : -1;
  const healthPercent = (health / maxHealth) * 100;
  const healthColor = healthPercent > 66 ? '#A9EAD2' : healthPercent > 33 ? '#E7A790' : '#FB2B57';

  const getArmPos = () => {
    const shoulderY = 20;
    switch(stance) {
      case 'attack_high': return { right: { x1: 8, y1: shoulderY, x2: 28, y2: shoulderY - 25 }, left: { x1: -8, y1: shoulderY, x2: -18, y2: shoulderY + 10 } };
      case 'attack_low': return { right: { x1: 8, y1: shoulderY, x2: 28, y2: shoulderY + 25 }, left: { x1: -8, y1: shoulderY, x2: -18, y2: shoulderY + 10 } };
      case 'parry_high': return { right: { x1: 8, y1: shoulderY, x2: 23, y2: shoulderY - 20 }, left: { x1: -8, y1: shoulderY, x2: -23, y2: shoulderY - 20 } };
      case 'parry_low': return { right: { x1: 8, y1: shoulderY, x2: 23, y2: shoulderY + 20 }, left: { x1: -8, y1: shoulderY, x2: -23, y2: shoulderY + 20 } };
      default: return { right: { x1: 8, y1: shoulderY, x2: 13, y2: shoulderY + 15 }, left: { x1: -8, y1: shoulderY, x2: -13, y2: shoulderY + 15 } };
    }
  };
  
  const arms = getArmPos();
  
  return (
    <g transform={`translate(${x}, ${y}) scale(${scaleX}, 1)`}>
      {/* Head */}
      <circle cx={0} cy={10} r={8} fill={fencerColor} />
      {/* Torso */}
      <line x1={0} y1={20} x2={0} y2={50} stroke={fencerColor} strokeWidth={2} />
      {/* Right arm */}
      <line x1={arms.right.x1} y1={arms.right.y1} x2={arms.right.x2} y2={arms.right.y2} stroke={fencerColor} strokeWidth={2} strokeLinecap="round" />
      {/* Left arm */}
      <line x1={arms.left.x1} y1={arms.left.y1} x2={arms.left.x2} y2={arms.left.y2} stroke={fencerColor} strokeWidth={2} strokeLinecap="round" />
      {/* Left leg */}
      <line x1={-5} y1={50} x2={-8} y2={70} stroke={fencerColor} strokeWidth={2} strokeLinecap="round" />
      {/* Right leg */}
      <line x1={5} y1={50} x2={8} y2={70} stroke={fencerColor} strokeWidth={2} strokeLinecap="round" />
      {/* Health bar background */}
      <rect x={-20} y={80} width={40} height={8} fill="white" stroke={fencerColor} strokeWidth={1} />
      {/* Health bar fill */}
      <rect x={-20} y={80} width={(healthPercent / 100) * 40} height={8} fill={healthColor} />
      {/* Name label */}
      <text x={0} y={100} textAnchor="middle" fontSize={13} fill={fencerColor} fontWeight="bold" fontFamily="Nunito">
        {name}
      </text>
      {/* Health text */}
      <text x={0} y={117} textAnchor="middle" fontSize={11} fill={fencerColor} fontFamily="Nunito">
        {health}/{maxHealth}
      </text>
    </g>
  );
};
