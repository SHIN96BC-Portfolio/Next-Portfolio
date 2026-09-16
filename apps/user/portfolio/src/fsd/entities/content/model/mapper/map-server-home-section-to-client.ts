import type { HomeSection } from '../client/home-section';
import type { HomeSectionGetRes } from '../server/home-section';

export default function mapServerHomeSectionToClient(sections: HomeSectionGetRes[]): HomeSection[] {
  if (!sections || !Array.isArray(sections)) {
    return [];
  }

  return sections.map(
    (section): HomeSection => ({
      id: section.id,
      pageKey: section.pageKey,
      sectionKey: section.sectionKey,
      sectionType: section.sectionType,
      title: section.title,
      config: section.config,
      configSchemaVersion: section.configSchemaVersion,
      displayOrder: section.displayOrder,
      isActive: section.isActive,
    })
  );
}
