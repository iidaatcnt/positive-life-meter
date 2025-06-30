import React from 'react';

interface LifeMeterDisplayProps {
  remainingLifeMillis: number;
  expectedLifespan: number;
  currentAge: number;
}

const LifeMeterDisplay: React.FC<LifeMeterDisplayProps> = ({
  remainingLifeMillis,
  expectedLifespan,
  currentAge
}) => {
  // Convert milliseconds to various time units
  const remainingSeconds = Math.floor(remainingLifeMillis / 1000);
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingDays = Math.floor(remainingHours / 24);
  const remainingWeeks = Math.floor(remainingDays / 7);
  const remainingMonths = Math.floor(remainingDays / 30.44); // Average month length
  const remainingYears = Math.floor(remainingDays / 365.25); // Including leap years

  // Calculate life progress percentage
  const lifeProgress = ((currentAge / expectedLifespan) * 100).toFixed(1);
  const remainingProgress = (100 - parseFloat(lifeProgress)).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        人生の残り時間
      </h2>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>経過: {lifeProgress}%</span>
          <span>残り: {remainingProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-red-500 to-orange-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${lifeProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Time Display Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">
            {remainingYears.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">年</div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {remainingMonths.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">ヶ月</div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">
            {remainingWeeks.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">週</div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {remainingDays.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">日</div>
        </div>
      </div>

      {/* Real-time countdown */}
      <div className="bg-gray-900 text-white p-4 rounded-lg text-center">
        <div className="text-lg font-mono">
          {Math.floor(remainingHours % 24).toString().padStart(2, '0')}:
          {Math.floor(remainingMinutes % 60).toString().padStart(2, '0')}:
          {Math.floor(remainingSeconds % 60).toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-400 mt-1">
          時:分:秒
        </div>
      </div>

      {/* Motivational message */}
      <div className="text-center mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-gray-700 italic">
          "明日死ぬかのように生きろ。永劫生きるかのように学べ。" - マハトマ・ガンジー
        </p>
      </div>
    </div>
  );
};

export default LifeMeterDisplay;