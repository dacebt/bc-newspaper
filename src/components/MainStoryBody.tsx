import { Box } from '@chakra-ui/react';
import Markdown from 'react-markdown';

interface MainStoryBodyProps {
  /**
   * Markdown-formatted text to render.
   * Single newlines will be promoted to paragraph breaks for better readability.
   */
  text: string;
  /**
   * Optional className for styling
   */
  className?: string;
}

/**
 * MainStoryBody - Specialized markdown renderer for main story bodies
 * 
 * Promotes single newlines to paragraph breaks for better readability.
 * This is scoped to main story bodies only - other markdown rendering
 * (announcements, etc.) uses the standard MarkdownText component.
 */
export function MainStoryBody({ text, className }: MainStoryBodyProps) {
  // Promote single newlines to double newlines (paragraph breaks)
  // This converts single line breaks into proper paragraph breaks
  const processedText = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n\n');

  return (
    <Box className={className}>
      <Markdown
        // Security: disable raw HTML rendering
        disallowedElements={['script', 'iframe', 'object', 'embed']}
        unwrapDisallowed
      >
        {processedText}
      </Markdown>
    </Box>
  );
}
