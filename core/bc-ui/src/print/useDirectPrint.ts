const PRINT_STYLE_ID = 'direct-print-style';
const PRINT_CLONE_ID = 'print-clone';
const PRINTING_BODY_CLASS = 'is-printing';

const PRINT_STYLE_TEXT = `
  html,
  body {
    overflow: visible !important;
    max-width: none !important;
  }

  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body.${PRINTING_BODY_CLASS} > *:not(#${PRINT_CLONE_ID}) {
    display: none !important;
  }

  #${PRINT_CLONE_ID} {
    display: block !important;
    box-sizing: border-box !important;
    overflow: visible !important;
    box-shadow: none !important;
  }
`;

export interface UseDirectPrintOptions {
  content: () => HTMLElement | null;
  onBeforePrint?: () => void;
  onAfterPrint?: () => void;
  bodyClass?: string;
}

export default function useDirectPrint({ content, onBeforePrint, onAfterPrint, bodyClass }: UseDirectPrintOptions) {
  const handlePrint = () => {
    const target = content();
    if (!target) {
      return;
    }

    onBeforePrint?.();

    const printStyle = document.createElement('style');
    printStyle.id = PRINT_STYLE_ID;
    printStyle.media = 'print';
    printStyle.textContent = PRINT_STYLE_TEXT;
    document.head.appendChild(printStyle);

    const clone = target.cloneNode(true) as HTMLElement;
    clone.id = PRINT_CLONE_ID;

    const { width } = target.getBoundingClientRect();
    clone.style.boxSizing = 'border-box';
    clone.style.width = `${width}px`;
    clone.style.marginInline = 'auto';
    clone.style.boxShadow = 'none';

    if (bodyClass) {
      clone.classList.add(...bodyClass.split(' ').filter(Boolean));
    }
    document.body.appendChild(clone);
    document.body.classList.add(PRINTING_BODY_CLASS);

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) {
        return;
      }
      cleaned = true;

      if (clone.parentNode) {
        document.body.removeChild(clone);
      }
      document.body.classList.remove(PRINTING_BODY_CLASS);

      const style = document.getElementById(PRINT_STYLE_ID);
      if (style) {
        document.head.removeChild(style);
      }

      onAfterPrint?.();
    };

    window.addEventListener('afterprint', cleanup, { once: true });
    window.print();
    cleanup();
  };

  return { handlePrint };
}
