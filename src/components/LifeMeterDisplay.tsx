// src/components/LifeMeterDisplay.tsx
import React from 'react';

interface LifeMeterDisplayProps {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LifeMeterDisplay: React.FC<LifeMeterDisplayProps> = ({
  years,
  months,
  days,
  hours,
  minutes,
  seconds,
}) => {
  return (
    <div className="text-center bg-gray-800 p-8 rounded-lg shadow-xl text-white">
      <h2 className="text-3xl font-bold mb-4 text-emerald-400">あなたの残り寿命</h2>
      <div className="grid grid-cols-2 gap-4 text-2xl md:grid-cols-3 lg:grid-cols-6">
        <div className="p-2 bg-gray-700 rounded">
          <span className="block font-mono text-4xl text-amber-300">{years}</span>
          <span className="text-sm text-gray-400">年</span>
        </div>
        <div className="p-2 bg-gray-700 rounded">
          <span className="block font-mono text-4xl text-amber-300">{months}</span>
          <span className="text-sm text-gray-400">ヶ月</span>
        </div>
        <div className="p-2 bg-gray-700 rounded">
          <span className="block font-mono text-4xl text-amber-300">{days}</span>
          <span className="text-sm text-gray-400">日</span>
        </div>
        <div className="p-2 bg-gray-700 rounded">
          <span className="block font-mono text-4xl text-amber-300">{hours}</span>
          <span className="text-sm text-gray-400">時間</span>
        </div>
        <div className="p-2 bg-gray-700 rounded">
          <span className="block font-mono text-4xl text-amber-300">{minutes}</span>
          <span className="text-sm text-gray-400">分</span>
        </div>
        <div className="p-2 bg-gray-700 rounded">
          <span className="block font-mono text-4xl text-amber-300">{seconds}</span>
          <span className="text-sm text-gray-400">秒</span>
        </div>
      </div>
      {years <= 5 && <p className="mt-4 text-red-400 text-lg font-semibold">残りの時間が少なくなってきました！今を大切に！</p>}
    </div>
  );
};

export default LifeMeterDisplay;