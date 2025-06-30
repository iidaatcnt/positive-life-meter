// src/lib/localStorageUtils.ts

interface UserData {
  birthDate: string; // YYYY-MM-DD
  currentRemainingLifeMillis: number; // 現在の残り寿命（ミリ秒）
  lastUpdated: number; // 最終更新日時（タイムスタンプ）
}

export interface ActionLog {
  type: 'positive' | 'negative';
  description: string;
  amountMillis: number; // 増減した寿命（ミリ秒）
  timestamp: number; // アクションが記録された日時
}

const USER_DATA_KEY = 'positiveLifeMeterUserData';
const ACTION_LOG_KEY = 'positiveLifeMeterActionLog';

/**
 * ユーザーデータをLocalStorageから読み込む
 * @returns UserData または null
 */
export const loadUserData = (): UserData | null => {
  if (typeof window === 'undefined') return null; // サーバーサイドでは実行しない
  const data = localStorage.getItem(USER_DATA_KEY);
  return data ? JSON.parse(data) : null;
};

/**
 * ユーザーデータをLocalStorageに保存する
 * @param data UserData
 */
export const saveUserData = (data: UserData) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
};

/**
 * アクションログをLocalStorageから読み込む
 * @returns ActionLog[] または []
 */
export const loadActionLogs = (): ActionLog[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(ACTION_LOG_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * アクションログをLocalStorageに保存する
 * @param logs ActionLog[]
 */
export const saveActionLogs = (logs: ActionLog[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTION_LOG_KEY, JSON.stringify(logs));
};