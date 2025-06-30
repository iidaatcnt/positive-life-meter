// src/lib/lifeCalculator.ts

// 将来の平均寿命予測（あくまでデモ用の仮定値）
const BASE_LIFE_EXPECTANCY_CURRENT = 88; // 現在の平均寿命（歳）
const BASE_LIFE_EXPECTANCY_FUTURE = 120; // 将来の世代の平均寿命予測（歳）
const GENERATION_THRESHOLD_YEAR = 2000; // この年以降生まれを「未来の世代」と仮定する閾値

/**
 * 生年月日に基づいておおよその寿命（年）を計算する
 * @param birthDateString 'YYYY-MM-DD'形式の生年月日
 * @returns 予測寿命（年）
 */
export const calculateExpectedLifespan = (birthDateString: string): number => {
  const birthYear = new Date(birthDateString).getFullYear();

  if (birthYear >= GENERATION_THRESHOLD_YEAR) {
    return BASE_LIFE_EXPECTANCY_FUTURE;
  } else {
    // 閾値より前の世代は、年が若くなるほど将来の平均寿命に近づける補間をしても良いが、
    // シンプルにデモでは現在の平均寿命を使用
    return BASE_LIFE_EXPECTANCY_CURRENT;
  }
};

/**
 * 生年月日と予測寿命から残り寿命をミリ秒で計算する
 * @param birthDateString 'YYYY-MM-DD'形式の生年月日
 * @param expectedLifespanYears 予測寿命（年）
 * @returns 残り寿命（ミリ秒）
 */
export const calculateRemainingLifeMillis = (
  birthDateString: string,
  expectedLifespanYears: number
): number => {
  const birthDate = new Date(birthDateString);
  const deathDate = new Date(
    birthDate.getFullYear() + expectedLifespanYears,
    birthDate.getMonth(),
    birthDate.getDate()
  );
  const now = new Date();

  return deathDate.getTime() - now.getTime();
};

/**
 * ミリ秒を年、月、日、時間、分、秒に変換する
 * @param milliseconds ミリ秒
 * @returns { years, months, days, hours, minutes, seconds }
 */
export const convertMillisToUnits = (milliseconds: number) => {
  if (milliseconds < 0) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
  const days = Math.floor((milliseconds / (1000 * 60 * 60 * 24)));
  
  // 月と年を厳密に計算するのは閏年などで複雑なので、ここではおおよそで表示
  // 30.44日を1ヶ月、365.25日を1年とする (平均的な日数)
  const years = Math.floor(days / 365.25);
  const remainingDaysAfterYears = days % 365.25;
  const months = Math.floor(remainingDaysAfterYears / 30.44);
  const remainingDaysAfterMonths = Math.floor(remainingDaysAfterYears % 30.44);


  return {
    years,
    months,
    days: remainingDaysAfterMonths, // 月で処理した残りの日数を表示
    hours,
    minutes,
    seconds,
  };
};