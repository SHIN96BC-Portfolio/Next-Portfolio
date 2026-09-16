import removeMarkdownHeader from './remove-markdown-header';

describe('removeMarkdownHeader', () => {
  it('removes matching ATX header block', () => {
    const input = '## 예약확정\n\n본문입니다.';
    expect(removeMarkdownHeader('예약확정', input)).toBe('본문입니다.');
  });

  it('handles null markdown and escapes special chars in name', () => {
    expect(removeMarkdownHeader('x', null)).toBe('');
    expect(removeMarkdownHeader('a+b', '## a+b\n\nbody')).toBe('body');
  });

  it('leaves content when header name does not match', () => {
    const input = '## Other\n\nbody';
    expect(removeMarkdownHeader('예약확정', input)).toBe(input);
  });
});
