import mapServerGnbToClient from './map-server-gnb-to-client';

describe('mapServerGnbToClient', () => {
  it('maps flat gnb items', () => {
    const result = mapServerGnbToClient([
      { id: 1, name: '홈', path: '/', icon: 'home' },
      { id: 2, name: '경력기술서', path: '/resume' },
    ]);

    expect(result).toEqual([
      { id: 1, name: '홈', path: '/', icon: 'home', children: undefined },
      { id: 2, name: '경력기술서', path: '/resume', children: undefined },
    ]);
  });

  it('recursively maps children', () => {
    const result = mapServerGnbToClient([
      {
        id: 1,
        name: '부모',
        path: '/parent',
        children: [{ id: 2, name: '자식', path: '/child' }],
      },
    ]);

    expect(result[0]?.children).toEqual([{ id: 2, name: '자식', path: '/child', children: undefined }]);
  });

  it('returns empty array for invalid input', () => {
    expect(mapServerGnbToClient(null as never)).toEqual([]);
    expect(mapServerGnbToClient(undefined as never)).toEqual([]);
  });
});
