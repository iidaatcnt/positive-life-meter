// src/app/page.tsx
'use client'; // Client Componentとしてマーク

import React, { useState, useEffect } from 'react';
import LifeMeterDisplay from '@/components/LifeMeterDisplay';
import ActionInput from '@/components/ActionInput';
import {
  calculateExpectedLifespan,
  calculateRemainingLifeMillis,
  convertMillisToUnits,
} from '@/lib/lifeCalculator';
import {
  loadUserData,
  saveUserData,
  loadActionLogs,
  saveActionLogs,
  ActionLog,
} from '@/lib/localStorageUtils';

interface UserData {
  birthDate: string;
  currentRemainingLifeMillis: number;
  lastUpdated: number;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [remainingLifeMillis, setRemainingLifeMillis] = useState<number>(0);
  const [lifeUnits, setLifeUnits] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [birthDateInput, setBirthDateInput] = useState<string>('');
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([]);

  // 1. 初期ロードとLocalStorageからのデータ復元
  useEffect(() => {
    const storedUserData = loadUserData();
    const storedActionLogs = loadActionLogs();
    
    if (storedUserData) {
      setUserData(storedUserData);
      setRemainingLifeMillis(storedUserData.currentRemainingLifeMillis);
    }
    setActionLogs(storedActionLogs);
  }, []);

  // 2. 寿命のリアルタイム更新
  useEffect(() => {
    if (userData) {
      const interval = setInterval(() => {
        // 現在の残り寿命から経過時間を引く
        // 前回の更新からの経過時間を考慮して正確に減算
        const now = Date.now();
        const elapsed = now - userData.lastUpdated; // ミリ秒単位で経過時間を計算

        const newRemaining = userData.currentRemainingLifeMillis - elapsed;
        setRemainingLifeMillis(newRemaining > 0 ? newRemaining : 0);

        // userData.lastUpdated を更新し、LocalStorageにも保存
        const updatedUserData = { ...userData, lastUpdated: now, currentRemainingLifeMillis: newRemaining > 0 ? newRemaining : 0 };
        setUserData(updatedUserData); // Stateも更新
        saveUserData(updatedUserData); // LocalStorageにも保存

        setLifeUnits(convertMillisToUnits(newRemaining));
      }, 1000); // 1秒ごとに更新

      return () => clearInterval(interval); // クリーンアップ
    }
  }, [userData]);

  // 3. 生年月日入力処理
  const handleSetBirthDate = () => {
    if (!birthDateInput) {
      alert('生年月日を入力してください。');
      return;
    }

    const expectedLifespan = calculateExpectedLifespan(birthDateInput);
    const initialRemainingMillis = calculateRemainingLifeMillis(birthDateInput, expectedLifespan);
    
    const newUserData: UserData = {
      birthDate: birthDateInput,
      currentRemainingLifeMillis: initialRemainingMillis,
      lastUpdated: Date.now(), // 初回設定時も最終更新日時を記録
    };

    setUserData(newUserData);
    setRemainingLifeMillis(initialRemainingMillis);
    saveUserData(newUserData);
  };

  // 4. 行動追加処理
  const handleAddAction = (log: Omit<ActionLog, 'timestamp'>) => {
    if (!userData) return;

    const timestamp = Date.now();
    const newLog: ActionLog = { ...log, timestamp };

    const updatedLogs = [...actionLogs, newLog];
    setActionLogs(updatedLogs);
    saveActionLogs(updatedLogs);

    // 寿命メーターを更新
    const newRemainingLifeMillis = userData.currentRemainingLifeMillis + log.amountMillis;
    const updatedUserData: UserData = {
      ...userData,
      currentRemainingLifeMillis: newRemainingLifeMillis,
      lastUpdated: timestamp, // アクション時も最終更新日時を記録
    };
    setUserData(updatedUserData);
    setRemainingLifeMillis(newRemainingLifeMillis);
    saveUserData(updatedUserData);
  };

  if (!userData) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-emerald-400">人生の羅針盤</h1>
          <p className="mb-4 text-lg">
            あなたの生年月日を入力して、寿命のカウントダウンを開始しましょう。
          </p>
          <input
            type="date"
            value={birthDateInput}
            onChange={(e) => setBirthDateInput(e.target.value)}
            className="w-full p-3 mb-4 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleSetBirthDate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            スタート！
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <h1 className="text-4xl font-extrabold mb-8 mt-4 text-emerald-400 drop-shadow-lg">
        ポジティブ寿命メーター
      </h1>
      <LifeMeterDisplay {...lifeUnits} />
      <ActionInput onAddAction={handleAddAction} />

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8 w-full max-w-2xl">
        <h3 className="text-2xl font-bold mb-4 text-center text-white">行動履歴</h3>
        {actionLogs.length === 0 ? (
          <p className="text-center text-gray-400">まだ行動が記録されていません。</p>
        ) : (
          <ul className="space-y-3">
            {actionLogs.map((log, index) => (
              <li key={index} className={`p-3 rounded-md flex justify-between items-center ${log.type === 'positive' ? 'bg-emerald-800' : 'bg-red-800'}`}>
                <div>
                  <span className="font-semibold">{log.description}</span>
                  <span className="block text-sm text-gray-300">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                <span className={`font-bold text-lg ${log.type === 'positive' ? 'text-emerald-300' : 'text-red-300'}`}>
                  {log.type === 'positive' ? '+' : ''}{log.amountMillis / (24 * 60 * 60 * 1000)}日
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}