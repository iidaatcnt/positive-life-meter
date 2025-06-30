'use client';

import React, { useState, useEffect } from 'react';
import LifeMeterDisplay from '@/components/LifeMeterDisplay';
import ActionInput from '@/components/ActionInput';
import {
  calculateExpectedLifespan,
  calculateRemainingLifeMillis,
  calculateCurrentAge,
  PersonalInfo,
  LifestyleFactors
} from '@/utils/lifeCalculator';

interface Action {
  id: string;
  name: string;
  impact: number;
  type: 'positive' | 'negative';
  description: string;
}

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    birthDate: new Date('1990-01-01'),
    gender: 'other' as const
  });
  
  const [lifestyleFactors, setLifestyleFactors] = useState<LifestyleFactors>({
    smoking: false,
    regularExercise: true,
    healthyDiet: true,
    excessiveAlcohol: false,
    chronicStress: false,
    socialConnections: true
  });

  const [actions, setActions] = useState<Action[]>([]);
  const [showSetup, setShowSetup] = useState(true);
  const [remainingLifeMillis, setRemainingLifeMillis] = useState(0);

  // Calculate values
  const expectedLifespan = calculateExpectedLifespan(personalInfo, lifestyleFactors);
  const currentAge = calculateCurrentAge(personalInfo.birthDate);
  const totalActionImpact = actions.reduce((sum, action) => sum + action.impact, 0);

  // Update remaining life milliseconds every second
  useEffect(() => {
    const updateRemainingLife = () => {
      const remaining = calculateRemainingLifeMillis(
        personalInfo.birthDate,
        expectedLifespan,
        totalActionImpact
      );
      setRemainingLifeMillis(remaining);
    };

    updateRemainingLife();
    const interval = setInterval(updateRemainingLife, 1000);
    return () => clearInterval(interval);
  }, [personalInfo.birthDate, expectedLifespan, totalActionImpact]);

  const handleActionAdd = (action: Action) => {
    setActions(prev => [...prev, action]);
  };

  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSetup(false);
  };

  if (showSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Positive Life Meter
            </h1>
            <p className="text-gray-600 mb-8 text-center">
              あなたの人生の残り時間を可視化し、より充実した日々を送るためのツールです
            </p>

            <form onSubmit={handleSetupSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  生年月日
                </label>
                <input
                  type="date"
                  value={personalInfo.birthDate.toISOString().split('T')[0]}
                  onChange={(e) => setPersonalInfo(prev => ({
                    ...prev,
                    birthDate: new Date(e.target.value)
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  性別
                </label>
                <select
                  value={personalInfo.gender}
                  onChange={(e) => setPersonalInfo(prev => ({
                    ...prev,
                    gender: e.target.value as 'male' | 'female' | 'other'
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  ライフスタイル
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={lifestyleFactors.smoking}
                      onChange={(e) => setLifestyleFactors(prev => ({
                        ...prev,
                        smoking: e.target.checked
                      }))}
                      className="mr-2"
                    />
                    喫煙している
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={lifestyleFactors.regularExercise}
                      onChange={(e) => setLifestyleFactors(prev => ({
                        ...prev,
                        regularExercise: e.target.checked
                      }))}
                      className="mr-2"
                    />
                    定期的に運動している
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={lifestyleFactors.healthyDiet}
                      onChange={(e) => setLifestyleFactors(prev => ({
                        ...prev,
                        healthyDiet: e.target.checked
                      }))}
                      className="mr-2"
                    />
                    健康的な食事を心がけている
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={lifestyleFactors.excessiveAlcohol}
                      onChange={(e) => setLifestyleFactors(prev => ({
                        ...prev,
                        excessiveAlcohol: e.target.checked
                      }))}
                      className="mr-2"
                    />
                    過度な飲酒をしている
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={lifestyleFactors.chronicStress}
                      onChange={(e) => setLifestyleFactors(prev => ({
                        ...prev,
                        chronicStress: e.target.checked
                      }))}
                      className="mr-2"
                    />
                    慢性的なストレスを感じている
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={lifestyleFactors.socialConnections}
                      onChange={(e) => setLifestyleFactors(prev => ({
                        ...prev,
                        socialConnections: e.target.checked
                      }))}
                      className="mr-2"
                    />
                    良好な人間関係がある
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                ライフメーターを開始
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Positive Life Meter
          </h1>
          <p className="text-gray-600">
            現在 {currentAge} 歳 | 予想寿命 {expectedLifespan.toFixed(1)} 歳
          </p>
          <button
            onClick={() => setShowSetup(true)}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            設定を変更
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <LifeMeterDisplay
              remainingLifeMillis={remainingLifeMillis}
              expectedLifespan={expectedLifespan}
              currentAge={currentAge}
            />
          </div>
          
          <div>
            <ActionInput
              onActionAdd={handleActionAdd}
              actions={actions}
            />
          </div>
        </div>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          ※ このツールは娯楽目的であり、実際の寿命を保証するものではありません
        </footer>
      </div>
    </div>
  );
}