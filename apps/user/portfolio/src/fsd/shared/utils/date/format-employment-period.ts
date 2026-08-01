interface EmploymentDuration {
  years: number;
  months: number;
}

function calculateEmploymentDuration(startYear: number, startMonth: number, endDate: Date): EmploymentDuration {
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth() + 1;

  // 시작월·현재월 모두 포함 (잡코리아/사람인 등 이력서 사이트 방식)
  const totalMonths = Math.max((endYear - startYear) * 12 + (endMonth - startMonth) + 1, 0);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return { years, months };
}

function formatDuration({ years, months }: EmploymentDuration) {
  return `(${years}년 ${months}개월)`;
}

export default function formatEmploymentPeriod(period: string, referenceDate = new Date()) {
  const currentEmploymentMatch = period.match(/^(\d{4})\.(\d{2})\s*[–-]\s*재직중$/);

  if (!currentEmploymentMatch) {
    return period;
  }

  const [, year, month] = currentEmploymentMatch;
  const duration = calculateEmploymentDuration(Number(year), Number(month), referenceDate);

  return `${period} ${formatDuration(duration)}`;
}
