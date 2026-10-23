import { loginSchema } from './login-schema';

function failIssues(input: unknown) {
  const result = loginSchema.safeParse(input);
  if (result.success) {
    throw new Error('expected loginSchema.safeParse to fail');
  }
  return result.error.issues;
}

describe('loginSchema', () => {
  it('accepts email and password without submit', () => {
    const result = loginSchema.safeParse({ email: 'a@b.com', password: 'pw' });
    expect(result.success).toBe(true);
  });

  it('keeps optional submit when provided', () => {
    const result = loginSchema.safeParse({ email: 'a@b.com', password: 'pw', submit: 'x' });
    expect(result.success).toBe(true);
    if (!result.success) {
      throw new Error('expected loginSchema.safeParse to succeed');
    }
    expect(result.data.submit).toBe('x');
  });

  it('rejects empty email at path email', () => {
    const issues = failIssues({ email: '', password: 'pw' });
    expect(issues.some((issue) => issue.path.includes('email'))).toBe(true);
  });

  it('rejects invalid email format', () => {
    const emailIssue = failIssues({ email: 'not-an-email', password: 'pw' }).find((issue) =>
      issue.path.includes('email')
    );
    expect(emailIssue).toBeDefined();
    expect(emailIssue?.message).toBe('Please provide a valid email.');
  });

  it('rejects empty password', () => {
    const passwordIssue = failIssues({ email: 'a@b.com', password: '' }).find((issue) =>
      issue.path.includes('password')
    );
    expect(passwordIssue).toBeDefined();
    expect(passwordIssue?.message).toBe('Please enter your password.');
  });

  it('rejects email longer than 255 characters', () => {
    const email = `${'a'.repeat(250)}@b.com`;
    const emailIssue = failIssues({ email, password: 'pw' }).find((issue) => issue.path.includes('email'));
    expect(emailIssue).toBeDefined();
    expect(emailIssue?.path).toContain('email');
  });

  it('rejects password longer than 255 characters', () => {
    const passwordIssue = failIssues({ email: 'a@b.com', password: 'p'.repeat(256) }).find((issue) =>
      issue.path.includes('password')
    );
    expect(passwordIssue).toBeDefined();
    expect(passwordIssue?.message).toBe('password is too long');
  });

  it('rejects missing email and password', () => {
    const paths = failIssues({}).flatMap((issue) => issue.path);
    expect(paths).toEqual(expect.arrayContaining(['email', 'password']));
  });
});
