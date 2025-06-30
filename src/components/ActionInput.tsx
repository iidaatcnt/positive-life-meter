import React, { useState } from 'react';

interface Action {
  id: string;
  name: string;
  impact: number; // Days added/subtracted from life
  type: 'positive' | 'negative';
  description: string;
}

interface ActionInputProps {
  onActionAdd: (action: Action) => void;
  actions: Action[];
}

const ActionInput: React.FC<ActionInputProps> = ({ onActionAdd, actions }) => {
  const [showForm, setShowForm] = useState(false);
  const [actionName, setActionName] = useState('');
  const [actionImpact, setActionImpact] = useState(0);
  const [actionType, setActionType] = useState<'positive' | 'negative'>('positive');
  const [actionDescription, setActionDescription] = useState('');

  // Predefined actions
  const predefinedActions: Omit<Action, 'id'>[] = [
    {
      name: '1日8000歩歩く',
      impact: 30,
      type: 'positive',
      description: '定期的な運動で健康寿命を延ばす'
    },
    {
      name: '禁煙する',
      impact: 365,
      type: 'positive',
      description: '喫煙をやめることで大幅に寿命が延びる'
    },
    {
      name: '十分な睡眠（7-8時間）',
      impact: 10,
      type: 'positive',
      description: '質の良い睡眠で体調を整える'
    },
    {
      name: '健康的な食事',
      impact: 15,
      type: 'positive',
      description: 'バランスの取れた食事で体を健康に保つ'
    },
    {
      name: 'ストレス管理・瞑想',
      impact: 20,
      type: 'positive',
      description: 'ストレスを減らし精神的健康を保つ'
    },
    {
      name: '過度な飲酒',
      impact: -5,
      type: 'negative',
      description: 'アルコールの過剰摂取は健康に悪影響'
    },
    {
      name: '運動不足',
      impact: -10,
      type: 'negative',
      description: '座りっぱなしの生活は寿命を縮める'
    },
    {
      name: 'ファストフード中心の食事',
      impact: -8,
      type: 'negative',
      description: '栄養バランスの悪い食事は健康リスクを高める'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (actionName.trim()) {
      const newAction: Action = {
        id: Date.now().toString(),
        name: actionName,
        impact: actionImpact,
        type: actionType,
        description: actionDescription
      };
      onActionAdd(newAction);
      setActionName('');
      setActionImpact(0);
      setActionDescription('');
      setShowForm(false);
    }
  };

  const handlePredefinedAction = (predefinedAction: Omit<Action, 'id'>) => {
    const newAction: Action = {
      ...predefinedAction,
      id: Date.now().toString()
    };
    onActionAdd(newAction);
  };

  const totalImpact = actions.reduce((sum, action) => sum + action.impact, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        人生に影響する行動
      </h3>

      {/* Impact Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className={`text-2xl font-bold ${totalImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalImpact > 0 ? '+' : ''}{totalImpact} 日
          </div>
          <div className="text-sm text-gray-600">
            あなたの行動による寿命への影響
          </div>
        </div>
      </div>

      {/* Predefined Actions */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">
          よくある健康行動
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {predefinedActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handlePredefinedAction(action)}
              className={`p-3 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                action.type === 'positive'
                  ? 'border-green-200 hover:border-green-400 bg-green-50'
                  : 'border-red-200 hover:border-red-400 bg-red-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">{action.name}</span>
                <span className={`font-bold text-sm ${
                  action.type === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {action.impact > 0 ? '+' : ''}{action.impact}日
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {action.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Action Form */}
      <div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-4"
        >
          {showForm ? 'フォームを閉じる' : 'カスタム行動を追加'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                行動名
              </label>
              <input
                type="text"
                value={actionName}
                onChange={(e) => setActionName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例: 毎日ヨガをする"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                寿命への影響（日数）
              </label>
              <input
                type="number"
                value={actionImpact}
                onChange={(e) => setActionImpact(parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                タイプ
              </label>
              <select
                value={actionType}
                onChange={(e) => setActionType(e.target.value as 'positive' | 'negative')}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="positive">ポジティブ（寿命を延ばす）</option>
                <option value="negative">ネガティブ（寿命を縮める）</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                説明
              </label>
              <textarea
                value={actionDescription}
                onChange={(e) => setActionDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                placeholder="この行動がなぜ寿命に影響するかを説明"
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              行動を追加
            </button>
          </form>
        )}
      </div>

      {/* Current Actions List */}
      {actions.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700 mb-3">
            あなたの行動リスト
          </h4>
          <div className="space-y-2">
            {actions.map((action) => (
              <div
                key={action.id}
                className={`p-3 rounded-lg border ${
                  action.type === 'positive'
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{action.name}</span>
                  <span className={`font-bold ${
                    action.type === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {action.impact > 0 ? '+' : ''}{action.impact}日
                  </span>
                </div>
                {action.description && (
                  <div className="text-sm text-gray-600 mt-1">
                    {action.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionInput;