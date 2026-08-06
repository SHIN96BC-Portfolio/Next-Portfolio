'use client';

import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';

interface Props {
  homeDict: DictionaryHome;
}

export default function ResumePrintButton({ homeDict }: Props) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="no-print rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
    >
      {homeDict.resume.print}
    </button>
  );
}
