import { portfolioCareerSectionsKo } from '../src/fsd/entities/content/model/mock/portfolio-career-sections.ko';

const lines = ['-- CAREER page seed (ko). Mirrors FE portfolio-career-sections.ko.ts mock.'];

for (const section of portfolioCareerSectionsKo) {
  const configJson = JSON.stringify(section.config).replace(/'/g, "''");
  const title = (section.title ?? '').replace(/'/g, "''");

  lines.push(`INSERT INTO home_section (
    id, page_key, section_key, section_type, locale,
    draft_title, draft_config, draft_config_schema_version,
    published_title, published_config, published_config_schema_version,
    version, published_at, display_order, is_active
) VALUES (
    '${section.id}'::uuid, '${section.pageKey}', '${section.sectionKey}', '${section.sectionType}', 'ko',
    ${title ? `'${title}'` : 'NULL'}, '${configJson}'::jsonb, ${section.configSchemaVersion},
    ${title ? `'${title}'` : 'NULL'}, '${configJson}'::jsonb, ${section.configSchemaVersion},
    1, NOW(), ${section.displayOrder}, TRUE
);`);
}

process.stdout.write(`${lines.join('\n')}\n`);
