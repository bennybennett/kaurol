import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from '../../shared/Link/Link'; // Import your custom Link component

interface MarkdownRendererProps {
  markdownText: string;
}

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ markdownText }) => {
  const renderers = {
    a: ({
      href,
      children,
    }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      children: React.ReactNode;
    }) => <Link href={href || '/'}>{children}</Link>,
  };

  return (
    <span>
      <ReactMarkdown components={renderers}>{markdownText}</ReactMarkdown>
    </span>
  );
};

export default MarkdownRenderer;
