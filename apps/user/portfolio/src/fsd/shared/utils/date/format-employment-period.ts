import { CONTENT_LANG, ContentLang } from '@FsdEntities/content/model/types';

export interface EmploymentDuration {
  years: number;
  months: number;
}

interface ParsedEmploymentPeriod {
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
}

const CURRENT_END_MARKERS = /^(?:재직중|Present|在職中)$/;

function stripDurationSuffix(period: string) {
  return period.replace(/\s*[\(（][^)）]*[\)）]\s*$/, '').trim();
}

function parseEmploymentPeriod(period: string, referenceDate: Date): ParsedEmploymentPeriod | null {
  const normalized = stripDurationSuffix(period);

  const dotFormatMatch = normalized.match(/^(\d{4})\.(\d{2})\s*[–-]\s*(.+)$/);
  if (!dotFormatMatch) return null;

  const [, startYear, startMonth, endPart] = dotFormatMatch;
  const end = parseEndPart(endPart, referenceDate);
  if (!end) return null;

  return {
    startYear: Number(startYear),
    startMonth: Number(startMonth),
    endYear: end.endYear,
    endMonth: end.endMonth,
  };
}

function parseEndPart(endPart: string, referenceDate: Date) {
  const trimmed = endPart.trim();

  if (!trimmed || CURRENT_END_MARKERS.test(trimmed)) {
    return {
      endYear: referenceDate.getFullYear(),
      endMonth: referenceDate.getMonth() + 1,
    };
  }

  const dotEndMatch = trimmed.match(/^(\d{4})\.(\d{2})$/);
  if (!dotEndMatch) return null;

  return { endYear: Number(dotEndMatch[1]), endMonth: Number(dotEndMatch[2]) };
}

export function calculateEmploymentDuration(
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number
): EmploymentDuration {
  const totalMonths = Math.max((endYear - startYear) * 12 + (endMonth - startMonth) + 1, 0);

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  };
}

function getEmploymentDuration(period: string, referenceDate = new Date()) {
  const parsed = parseEmploymentPeriod(period, referenceDate);
  if (!parsed) return null;

  return calculateEmploymentDuration(parsed.startYear, parsed.startMonth, parsed.endYear, parsed.endMonth);
}

function formatDuration({ years, months }: EmploymentDuration, lang: ContentLang) {
  if (lang === CONTENT_LANG.EN) {
    if (years === 0) return `(${months} mo)`;
    if (months === 0) return `(${years} yr)`;
    return `(${years} yr ${months} mo)`;
  }

  if (lang === CONTENT_LANG.JA) {
    if (years === 0) return `（${months}ヶ月）`;
    if (months === 0) return `（${years}年）`;
    return `（${years}年${months}ヶ月）`;
  }

  if (years === 0) return `(${months}개월)`;
  if (months === 0) return `(${years}년)`;
  return `(${years}년 ${months}개월)`;
}

function formatTotalDuration({ years, months }: EmploymentDuration, lang: ContentLang) {
  if (lang === CONTENT_LANG.EN) {
    if (years === 0) return `Total ${months} mo`;
    if (months === 0) return `Total ${years} yr`;
    return `Total ${years} yr ${months} mo`;
  }

  if (lang === CONTENT_LANG.JA) {
    if (years === 0) return `合計 ${months}ヶ月`;
    if (months === 0) return `合計 ${years}年`;
    return `合計 ${years}年${months}ヶ月`;
  }

  if (years === 0) return `총 ${months}개월`;
  if (months === 0) return `총 ${years}년`;
  return `총 ${years}년 ${months}개월`;
}

export function sumEmploymentDurations(durations: EmploymentDuration[]): EmploymentDuration {
  const totalMonths = durations.reduce((sum, { years, months }) => sum + years * 12 + months, 0);

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  };
}

export function formatTotalEmploymentPeriod(
  periods: string[],
  lang: ContentLang = CONTENT_LANG.KO,
  referenceDate = new Date()
) {
  const durations = periods
    .map((period) => getEmploymentDuration(period, referenceDate))
    .filter((duration): duration is EmploymentDuration => duration !== null);

  if (durations.length === 0) return null;

  return formatTotalDuration(sumEmploymentDurations(durations), lang);
}

export default function formatEmploymentPeriod(
  period: string,
  lang: ContentLang = CONTENT_LANG.KO,
  referenceDate = new Date()
) {
  const basePeriod = stripDurationSuffix(period);
  const duration = getEmploymentDuration(period, referenceDate);

  if (!duration) return basePeriod;

  return `${basePeriod} ${formatDuration(duration, lang)}`;
}
