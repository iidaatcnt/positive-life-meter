// Life expectancy data for Japan (2023)
const LIFE_EXPECTANCY_JAPAN = {
  male: 81.05,
  female: 87.09,
  average: 84.07
};

export interface PersonalInfo {
  birthDate: Date;
  gender: 'male' | 'female' | 'other';
  country?: string;
}

export interface LifestyleFactors {
  smoking: boolean;
  regularExercise: boolean;
  healthyDiet: boolean;
  excessiveAlcohol: boolean;
  chronicStress: boolean;
  socialConnections: boolean;
}

/**
 * Calculate expected lifespan based on personal info and lifestyle factors
 */
export function calculateExpectedLifespan(
  personalInfo: PersonalInfo,
  lifestyleFactors?: LifestyleFactors
): number {
  let baseLifeExpectancy: number;

  // Base life expectancy
  if (personalInfo.gender === 'male') {
    baseLifeExpectancy = LIFE_EXPECTANCY_JAPAN.male;
  } else if (personalInfo.gender === 'female') {
    baseLifeExpectancy = LIFE_EXPECTANCY_JAPAN.female;
  } else {
    baseLifeExpectancy = LIFE_EXPECTANCY_JAPAN.average;
  }

  // Apply lifestyle adjustments if provided
  if (lifestyleFactors) {
    let adjustment = 0;

    // Smoking: -10 to -15 years
    if (lifestyleFactors.smoking) {
      adjustment -= 12;
    }

    // Regular exercise: +3 to +7 years
    if (lifestyleFactors.regularExercise) {
      adjustment += 5;
    }

    // Healthy diet: +2 to +5 years
    if (lifestyleFactors.healthyDiet) {
      adjustment += 3;
    }

    // Excessive alcohol: -5 to -10 years
    if (lifestyleFactors.excessiveAlcohol) {
      adjustment -= 7;
    }

    // Chronic stress: -2 to -5 years
    if (lifestyleFactors.chronicStress) {
      adjustment -= 3;
    }

    // Strong social connections: +2 to +4 years
    if (lifestyleFactors.socialConnections) {
      adjustment += 3;
    }

    baseLifeExpectancy += adjustment;
  }

  return Math.max(baseLifeExpectancy, 50); // Minimum of 50 years
}

/**
 * Calculate current age in years
 */
export function calculateCurrentAge(birthDate: Date): number {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  
  return age;
}

/**
 * Calculate remaining life in milliseconds
 */
export function calculateRemainingLifeMillis(
  birthDate: Date,
  expectedLifespan: number,
  actionImpactDays: number = 0
): number {
  const currentAge = calculateCurrentAge(birthDate);
  const remainingYears = (expectedLifespan - currentAge) + (actionImpactDays / 365.25);
  
  if (remainingYears <= 0) {
    return 0;
  }
  
  const remainingMillis = remainingYears * 365.25 * 24 * 60 * 60 * 1000;
  return Math.max(remainingMillis, 0);
}

/**
 * Calculate remaining life in days
 */
export function calculateRemainingLifeDays(
  birthDate: Date,
  expectedLifespan: number,
  actionImpactDays: number = 0
): number {
  const remainingMillis = calculateRemainingLifeMillis(birthDate, expectedLifespan, actionImpactDays);
  return Math.floor(remainingMillis / (24 * 60 * 60 * 1000));
}

/**
 * Calculate life progress percentage
 */
export function calculateLifeProgress(
  birthDate: Date,
  expectedLifespan: number
): number {
  const currentAge = calculateCurrentAge(birthDate);
  return Math.min((currentAge / expectedLifespan) * 100, 100);
}

/**
 * Format time remaining in human readable format
 */
export function formatTimeRemaining(milliseconds: number): {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(days / 365.25);

  return {
    years: years,
    months: months,
    days: days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60
  };
}

/**
 * Get motivational message based on remaining time
 */
export function getMotivationalMessage(remainingDays: number): string {
  if (remainingDays > 20000) {
    return "たくさんの時間があります。新しいことに挑戦し、夢を追いかけましょう！";
  } else if (remainingDays > 10000) {
    return "まだ多くの可能性があります。今日から健康的な習慣を始めませんか？";
  } else if (remainingDays > 5000) {
    return "時間は貴重です。大切な人との時間を大切にしましょう。";
  } else if (remainingDays > 1000) {
    return "毎日を大切に。やりたいことリストを作って実行しましょう！";
  } else {
    return "今この瞬間を大切に。愛する人に感謝の気持ちを伝えましょう。";
  }
}