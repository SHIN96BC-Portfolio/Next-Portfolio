import mergeClassNames from '@FsdShared/utils/style/merge-class-names';

const HIGHLIGHT_CATEGORY_STYLES: Record<string, string> = {
  '【차세대】': 'bg-primary/15 text-primary',
  '【운영】': 'bg-secondary/15 text-secondary',
  '【아키텍처】': 'bg-accent text-accent-foreground',
  '【리팩토링】': 'bg-muted text-foreground',
  '【UI 시스템】': 'bg-warning/15 text-warning',
  '【인프라·품질】': 'bg-success/15 text-success',
};

function parseHighlightItem(item: string) {
  const match = item.match(/^(【[^】]+】)\s*(.*)$/);
  if (!match) return { category: null, text: item };

  return { category: match[1], text: match[2] };
}

interface Props {
  item: string;
}

export default function HighlightListItem({ item }: Props) {
  const { category, text } = parseHighlightItem(item);
  const categoryStyle = category ? HIGHLIGHT_CATEGORY_STYLES[category] : null;

  return (
    <li className="text-sm text-muted-foreground flex gap-2 items-start">
      <span className="text-primary shrink-0 mt-0.5">•</span>
      <span>
        {category && categoryStyle && (
          <span
            className={mergeClassNames(
              'inline-block rounded px-1.5 py-0.5 text-xs font-semibold mr-1.5 align-middle',
              categoryStyle
            )}
          >
            {category.replace(/【|】/g, '')}
          </span>
        )}
        {text}
      </span>
    </li>
  );
}
