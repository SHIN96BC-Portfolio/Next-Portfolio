import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';
import PrintAutoTrigger from '@FsdShared/print/ui/PrintAutoTrigger';
import PrintPageToolbar from '@FsdShared/print/ui/PrintPageToolbar';

interface Props {
  homeDict: DictionaryHome;
  children: React.ReactNode;
}

/** 인쇄 전용 페이지 shell — GNB 없음, fluid 용지 레이아웃 */
export default function PrintPageLayout({ homeDict, children }: Props) {
  return (
    <div className="print-document-root min-h-screen bg-background text-foreground">
      <PrintPageToolbar homeDict={homeDict} />
      <PrintAutoTrigger />
      {children}
    </div>
  );
}
