import { FC } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';

interface MarkdownRendererProps {
  markdownText: string;
}

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ markdownText }) => {
  return (
    <span>
      <ReactMarkdown>{markdownText}</ReactMarkdown>
    </span>
  );
};

export default MarkdownRenderer;
