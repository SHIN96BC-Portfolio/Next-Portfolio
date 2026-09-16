import { I18N_LOCALE } from '@FsdShared/config/i18n/client';
import formatEmploymentPeriod, {
  calculateEmploymentDuration,
  formatTotalEmploymentPeriod,
  sumEmploymentDurations,
} from './format-employment-period';

describe('calculateEmploymentDuration', () => {
  it('counts inclusive months', () => {
    expect(calculateEmploymentDuration(2020, 1, 2020, 1)).toEqual({ years: 0, months: 1 });
    expect(calculateEmploymentDuration(2020, 1, 2021, 1)).toEqual({ years: 1, months: 1 });
    expect(calculateEmploymentDuration(2020, 1, 2020, 12)).toEqual({ years: 1, months: 0 });
  });
});

describe('sumEmploymentDurations', () => {
  it('sums years and months with carry', () => {
    expect(
      sumEmploymentDurations([
        { years: 1, months: 8 },
        { years: 0, months: 6 },
      ])
    ).toEqual({ years: 2, months: 2 });
  });
});

describe('formatEmploymentPeriod', () => {
  const ref = new Date(2024, 5, 15); // 2024-06

  it('appends Korean duration and strips existing suffix', () => {
    expect(formatEmploymentPeriod('2020.01 – 2021.01', I18N_LOCALE.KO, ref)).toBe('2020.01 – 2021.01 (1년 1개월)');
    expect(formatEmploymentPeriod('2020.01 – 2021.01 (old)', I18N_LOCALE.KO, ref)).toBe(
      '2020.01 – 2021.01 (1년 1개월)'
    );
  });

  it('uses reference date for Present', () => {
    expect(formatEmploymentPeriod('2024.01 – Present', I18N_LOCALE.EN, ref)).toBe('2024.01 – Present (6 mo)');
  });

  it('returns base period when unparsable', () => {
    expect(formatEmploymentPeriod('invalid', I18N_LOCALE.KO, ref)).toBe('invalid');
  });
});

describe('formatTotalEmploymentPeriod', () => {
  const ref = new Date(2024, 0, 1);

  it('sums multiple periods', () => {
    expect(formatTotalEmploymentPeriod(['2020.01 – 2020.12', '2021.01 – 2021.06'], I18N_LOCALE.KO, ref)).toBe(
      '총 1년 6개월'
    );
  });

  it('returns null when nothing parses', () => {
    expect(formatTotalEmploymentPeriod(['x'], I18N_LOCALE.KO, ref)).toBeNull();
  });
});
