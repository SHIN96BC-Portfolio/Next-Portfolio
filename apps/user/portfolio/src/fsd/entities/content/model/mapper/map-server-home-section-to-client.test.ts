import { PAGE_KEY } from '@FsdShared/config/routing/page-key';
import { SECTION_TYPE } from '../constants/section-type';
import type { HomeSectionGetRes } from '../server/home-section';
import mapServerHomeSectionToClient from './map-server-home-section-to-client';

describe('mapServerHomeSectionToClient', () => {
  it('maps server sections to client shape', () => {
    const sections: HomeSectionGetRes[] = [
      {
        id: 'sec-1',
        pageKey: PAGE_KEY.HOME,
        sectionKey: 'hero',
        sectionType: SECTION_TYPE.HERO,
        title: 'Hero',
        config: {
          name: 'Test',
          title: 'Title',
          tagline: 'Tag',
          links: [],
        },
        configSchemaVersion: 1,
        displayOrder: 0,
        isActive: true,
      },
    ];

    expect(mapServerHomeSectionToClient(sections)).toEqual([
      {
        id: 'sec-1',
        pageKey: PAGE_KEY.HOME,
        sectionKey: 'hero',
        sectionType: SECTION_TYPE.HERO,
        title: 'Hero',
        config: {
          name: 'Test',
          title: 'Title',
          tagline: 'Tag',
          links: [],
        },
        configSchemaVersion: 1,
        displayOrder: 0,
        isActive: true,
      },
    ]);
  });

  it('returns empty array for invalid input', () => {
    expect(mapServerHomeSectionToClient(null as never)).toEqual([]);
    expect(mapServerHomeSectionToClient(undefined as never)).toEqual([]);
  });
});
