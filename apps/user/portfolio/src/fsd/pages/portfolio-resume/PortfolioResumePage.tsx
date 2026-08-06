import {
  ContentLang,
  HomeSectionRes,
  MarkdownConfig,
  PAGE_KEY,
  ResumeProjectConfig,
  SECTION_TYPE,
} from '@FsdEntities/content/model/types';
import { I18N_DICTIONARY_NAMESPACE } from '@FsdShared/config/i18n';
import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';
import getI18nTranslator from '@FsdShared/config/i18n/utils/get-i18n-translator';
import ResumeMarkdownBlock from '@FsdWidgets/resume/ui/ResumeMarkdownBlock';
import ResumeProjectDocument from '@FsdWidgets/resume/ui/ResumeProjectDocument';
import fetchHomeSectionsSSR from '@NextApp/_actions/fetchHomeSectionsSSR';

type PortfolioResumePageProps = {
  lang: ContentLang;
};

export default async function PortfolioResumePage({ lang }: PortfolioResumePageProps) {
  const [sections, { dict: homeDict }] = await Promise.all([
    fetchHomeSectionsSSR(lang, PAGE_KEY.CAREER),
    getI18nTranslator(lang, I18N_DICTIONARY_NAMESPACE.HOME),
  ]);

  return (
    <div className="resume-document bg-background pb-16 print:bg-white print:pb-0">
      <div className="mx-auto max-w-[210mm] px-6 py-10 sm:px-10 sm:py-12 print:max-w-none print:px-0 print:py-0">
        <div className="resume-paper rounded-xl border border-border/60 bg-card px-6 py-8 shadow-sm sm:px-10 sm:py-12 print:rounded-none print:border-0 print:bg-white print:px-0 print:py-0 print:shadow-none">
          <PortfolioResumeSectionRenderer sections={sections} labels={homeDict.resume.labels} />
        </div>
      </div>
    </div>
  );
}

function PortfolioResumeSectionRenderer({
  sections,
  labels,
}: {
  sections: HomeSectionRes[];
  labels: DictionaryHome['resume']['labels'];
}) {
  const activeSections = [...sections]
    .filter((section) => section.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="space-y-10 print:space-y-8">
      {activeSections.map((section) => {
        switch (section.sectionType) {
          case SECTION_TYPE.MARKDOWN:
            return (
              <ResumeMarkdownBlock
                key={section.id}
                title={section.title}
                config={section.config as MarkdownConfig}
                variant={section.sectionKey === 'intro' ? 'intro' : 'section'}
              />
            );

          case SECTION_TYPE.RESUME_PROJECT:
            return (
              <ResumeProjectDocument key={section.id} config={section.config as ResumeProjectConfig} labels={labels} />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
