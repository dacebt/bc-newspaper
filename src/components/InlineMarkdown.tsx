import { Text, Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface InlineMarkdownProps {
  text: string;
}

export function InlineMarkdown({ text }: InlineMarkdownProps) {
  // Simple inline markdown parser for **bold** and *italic* only
  const parseInlineMarkdown = (input: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    let remaining = input;
    let key = 0;

    // Handle **bold** first
    const boldRegex = /\*\*(.*?)\*\*/g;
    let boldMatch;

    while ((boldMatch = boldRegex.exec(remaining)) !== null) {
      // Add text before the match
      if (boldMatch.index > 0) {
        const beforeText = remaining.substring(0, boldMatch.index);
        parts.push(beforeText);
      }

      // Add the bold text
      const boldText = boldMatch[1];
      parts.push(
        <Text key={key++} as="strong" color="text.primary">
          {boldText}
        </Text>
      );

      // Update remaining text
      remaining = remaining.substring(boldMatch.index + boldMatch[0].length);
      boldRegex.lastIndex = 0; // Reset regex for next search
    }

    // Add remaining text if any
    if (remaining) {
      // Now handle *italic* in the remaining text
      const italicRegex = /\*(.*?)\*/g;
      let italicMatch;

      while ((italicMatch = italicRegex.exec(remaining)) !== null) {
        // Add text before the match
        if (italicMatch.index > 0) {
          const beforeText = remaining.substring(0, italicMatch.index);
          parts.push(beforeText);
        }

        // Add the italic text
        const italicText = italicMatch[1];
        parts.push(
          <Text key={key++} as="em" color="text.primary">
            {italicText}
          </Text>
        );

        // Update remaining text
        remaining = remaining.substring(italicMatch.index + italicMatch[0].length);
        italicRegex.lastIndex = 0; // Reset regex for next search
      }

      // Add any final remaining text
      if (remaining) {
        parts.push(remaining);
      }
    }

    return parts;
  };

  const parsedContent = parseInlineMarkdown(text);

  return (
    <Box>
      {parsedContent.map((part, index) => (
        <span key={index}>{part}</span>
      ))}
    </Box>
  );
}
