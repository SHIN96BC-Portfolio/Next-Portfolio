import { type ReactElement } from 'react';
import useDirectPrint, { type UseDirectPrintOptions } from './useDirectPrint';

export interface DirectPrintProps extends UseDirectPrintOptions {
  trigger: () => ReactElement;
}

export default function DirectPrint({ content, trigger, onBeforePrint, onAfterPrint, bodyClass }: DirectPrintProps) {
  const { handlePrint } = useDirectPrint({ content, onBeforePrint, onAfterPrint, bodyClass });
  const triggerElement = trigger();

  return (
    <span onClick={handlePrint} style={{ display: 'contents' }}>
      {triggerElement}
    </span>
  );
}
