import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface Props {
  text: string;
}

/** 마크다운 형식으로 넘겨주는 text를 변환하기 위한 컴포넌트 */
const RenderMarkdownText = ({ text }: Props) => {
  return (
    <ReactMarkdown
      components={{
        a: ({ node, children, ...props }) => (
          <a
            {...props}
            className="text-primary hover:text-primary2 underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            {children}
          </a>
        ),
      }}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
    >
      {text}
    </ReactMarkdown>
  );
};

export default RenderMarkdownText;
