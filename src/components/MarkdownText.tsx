import { Box } from '@chakra-ui/react';
import Markdown from 'react-markdown';

interface MarkdownTextProps {
  /**
   * Markdown-formatted text to render.
   * Supports: paragraphs, **bold**, *italic*, > blockquotes, lists.
   */
  text: string;
  /**
   * Optional className for styling
   */
  className?: string;
}

/**
 * MarkdownText - Canonical markdown renderer for edition content
 * 
 * Renders markdown text safely (no raw HTML execution).
 * Supports standard markdown subset: paragraphs, emphasis, blockquotes, lists.
 * 
 * Used for: main story bodies, announcement titles/summaries.
 */
export function MarkdownText({ text, className }: MarkdownTextProps) {
  return (
    <Box className={className}>
      <Markdown
        // Security: disable raw HTML rendering
        disallowedElements={['script', 'iframe', 'object', 'embed']}
        unwrapDisallowed
        // Supported: p, strong, em, blockquote, ul, ol, li
        // Automatically handled by react-markdown defaults
      >
        {text}
      </Markdown>
    </Box>
  );
}
