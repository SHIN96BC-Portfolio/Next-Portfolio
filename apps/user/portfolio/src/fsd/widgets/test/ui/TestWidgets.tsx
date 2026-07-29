'use client';

import { I18N_DICTIONARY_NAMESPACE } from '@FsdShared/config/i18n';
import useI18n from '@FsdShared/config/i18n/hooks/useI18n';

export default function TestWidgets() {
  const { dict } = useI18n(I18N_DICTIONARY_NAMESPACE.COMMON);

  return (
    <div>
      TestWidgets
      <div>{dict.test.title}</div>
    </div>
  );
}
