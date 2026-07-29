interface EmploymentDuration {
  years: number;
  months: number;
}

function calculateEmploymentDuration(startYear: number, startMonth: number, endDate: Date): EmploymentDuration {
  let years = endDate.getFullYear() - startYear;
  let months = endDate.getMonth() + 1 - startMonth;

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years: Math.max(years, 0), months: Math.max(months, 0) };
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
