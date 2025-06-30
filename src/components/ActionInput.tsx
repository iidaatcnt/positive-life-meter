// src/components/ActionInput.tsx
import React, { useState } from 'react';
import { ActionLog } from '@/lib/localStorageUtils';

interface ActionInputProps {
  onAddAction: (log: Omit<ActionLog, 'timestamp'>) => void;
}

// 寿命の増減量（デモ用）
const LIFE_CHANGE_MILLIS = {
  POSITIVE: 2 * 24 * 60 * 60 * 1000, // +2日分
  NEGATIVE: -1 * 24 * 60 * 60 * 1000, // -1日分
};

const ActionInput: React.FC<ActionInputProps> = ({ onAddAction }) => {
  const [description, setDescription] = useState('');

  const handleAction = (type: 'positive' | 'negative') => {
    if (!description.trim()) {
      alert('行動内容を入力してください。');
      return;
    }

    const amountMillis = type === 'positive' ? LIFE_CHANGE_MILLIS.POSITIVE : LIFE_CHANGE_MILLIS.NEGATIVE;
    
    onAddAction({
      type,
      description,
      amountMillis,
    });
    setDescription(''); // 入力フィールドをクリア
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg mt-8">
      <h3 className="text-2xl font-bold mb-4 text-center text-white">日々の行動を記録</h3>
      <input
        type="text"
        placeholder="今日の良い行動/悪い行動を入力..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 mb-4 rounded-md bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <div className="flex justify-around space-x-4">
        <button
          onClick={() => handleAction('positive')}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          <span role="img" aria-label="plus">✨</span> ポジティブ！ (+2日)
        </button>
        <button
          onClick={() => handleAction('negative')}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          <span role="img" aria-label="minus">💀</span> ネガティブ... (-1日)
        </button>
      </div>
    </div>
  );
};

export default ActionInput;