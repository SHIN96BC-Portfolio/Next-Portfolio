import removeMarkdownLinks from './remove-markdown-links';

describe('removeMarkdownLinks', () => {
  it('strips links for matching host and keeps label', () => {
    const md = 'see [Google](https://www.google.com/search) please';
    expect(removeMarkdownLinks('https://google.com', md)).toBe('see Google please');
  });

  it('returns original markdown when url/markdown empty or invalid', () => {
    expect(removeMarkdownLinks('', 'a')).toBe('a');
    expect(removeMarkdownLinks('https://a.com', '')).toBe('');
    expect(removeMarkdownLinks('not-a-url', '[x](https://a.com)')).toBe('[x](https://a.com)');
  });

  it('does not remove links for other hosts', () => {
    const md = '[A](https://a.com/x) [B](https://b.com/y)';
    expect(removeMarkdownLinks('https://a.com', md)).toBe('A [B](https://b.com/y)');
  });
});
